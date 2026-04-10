import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const BUCKET_NAME = "make-5ca68e05-uploads";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";

// Create bucket on startup
(async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b: any) => b.name === BUCKET_NAME);
  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME);
  }
})();

app.get("/make-server-5ca68e05/health", (c) => {
  return c.json({ status: "ok" });
});

// STEP 1: Save form data + files, create Stripe Checkout, return checkout URL
app.post("/make-server-5ca68e05/submit-form", async (c) => {
  try {
    const formData = await c.req.formData();

    const textFields: Record<string, string> = {};
    const fileEntries: { fieldName: string; file: File }[] = [];

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        textFields[key] = value;
      } else if (value instanceof File) {
        fileEntries.push({ fieldName: key, file: value });
      }
    }

    // Upload files to Supabase Storage
    const uploadedFiles: { fieldName: string; fileName: string; url: string }[] = [];
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    for (const { fieldName, file } of fileEntries) {
      const filePath = `${submissionId}/${fieldName}/${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, arrayBuffer, { contentType: file.type });

      if (uploadError) {
        console.log(`File upload error for ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: signedData } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days

      uploadedFiles.push({
        fieldName,
        fileName: file.name,
        url: signedData?.signedUrl || "URL generation failed",
      });
    }

    // Save to KV store (email NOT sent yet — waiting for payment)
    await kv.set(submissionId, JSON.stringify({
      textFields,
      uploadedFiles,
      submittedAt: new Date().toISOString(),
      paymentStatus: "pending",
    }));

    // Determine price from budget selection
    const priceAmount = getPriceFromBudget(textFields.budget);

    // Create Stripe Checkout Session
    const frontendOrigin = c.req.header("Origin") || c.req.header("Referer")?.replace(/\/$/, "") || "https://example.com";

    const stripeBody = new URLSearchParams();
    stripeBody.append("mode", "payment");
    stripeBody.append("success_url", `${frontendOrigin}/payment-success?session_id={CHECKOUT_SESSION_ID}&submission_id=${submissionId}`);
    stripeBody.append("cancel_url", `${frontendOrigin}/payment-cancelled?submission_id=${submissionId}`);
    stripeBody.append("line_items[0][price_data][currency]", "usd");
    stripeBody.append("line_items[0][price_data][product_data][name]", `Website Development — ${textFields.companyName || "Custom Website"}`);
    stripeBody.append("line_items[0][price_data][product_data][description]", `Professional website for ${textFields.companyName || "your business"}. Budget: ${textFields.budget || "Standard"}`);
    stripeBody.append("line_items[0][price_data][unit_amount]", String(priceAmount));
    stripeBody.append("line_items[0][quantity]", "1");
    stripeBody.append("customer_email", textFields.email || "");
    stripeBody.append("metadata[submission_id]", submissionId);
    stripeBody.append("metadata[company_name]", textFields.companyName || "");
    stripeBody.append("metadata[owner_name]", textFields.ownerName || "");
    stripeBody.append("metadata[client_email]", textFields.email || "");
    stripeBody.append("metadata[phone]", textFields.phone || "");
    stripeBody.append("metadata[city]", textFields.city || "");
    stripeBody.append("metadata[country]", textFields.country || "");
    stripeBody.append("metadata[business_type]", textFields.businessType || "");
    stripeBody.append("metadata[goals]", (textFields.goals || "").slice(0, 500));
    stripeBody.append("metadata[pages]", (textFields.pages || "").slice(0, 500));
    stripeBody.append("metadata[budget]", textFields.budget || "");
    stripeBody.append("metadata[timeline]", textFields.timeline || "");
    stripeBody.append("metadata[tagline]", (textFields.tagline || "").slice(0, 500));
    stripeBody.append("metadata[domain_name]", textFields.domainName || "");
    stripeBody.append("metadata[style_pref]", textFields.stylePref || "");
    stripeBody.append("metadata[features]", (textFields.features || "").slice(0, 500));
    stripeBody.append("metadata[admin_email]", "sanant@xtecglobal.com");

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stripeBody.toString(),
    });

    const stripeData = await stripeRes.json();
    console.log("Stripe checkout response:", JSON.stringify(stripeData));

    if (!stripeRes.ok || !stripeData.url) {
      console.log(`Stripe error: ${JSON.stringify(stripeData)}`);
      return c.json({
        success: false,
        error: `Payment session creation failed: ${stripeData.error?.message || "Unknown Stripe error"}`,
      }, 500);
    }

    // Update KV with stripe session ID
    await kv.set(submissionId, JSON.stringify({
      textFields,
      uploadedFiles,
      submittedAt: new Date().toISOString(),
      paymentStatus: "pending",
      stripeSessionId: stripeData.id,
    }));

    return c.json({
      success: true,
      submissionId,
      checkoutUrl: stripeData.url,
    });

  } catch (err: any) {
    console.log(`Form submission error: ${err.message}`);
    return c.json({ success: false, error: `Form submission failed: ${err.message}` }, 500);
  }
});

// STEP 2: Verify payment & send email
app.post("/make-server-5ca68e05/verify-payment", async (c) => {
  try {
    const { sessionId, submissionId } = await c.req.json();

    if (!sessionId || !submissionId) {
      return c.json({ success: false, error: "Missing sessionId or submissionId" }, 400);
    }

    // Verify Stripe session
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}` },
    });
    const session = await stripeRes.json();
    console.log("Stripe session verify:", JSON.stringify(session));

    if (!stripeRes.ok) {
      return c.json({ success: false, error: `Stripe verification failed: ${session.error?.message}` }, 500);
    }

    if (session.payment_status !== "paid") {
      return c.json({ success: false, error: "Payment not completed yet", paymentStatus: session.payment_status }, 400);
    }

    // Get saved submission data
    const savedRaw = await kv.get(submissionId);
    if (!savedRaw) {
      return c.json({ success: false, error: "Submission data not found" }, 404);
    }

    const saved = JSON.parse(savedRaw as string);

    // Check if email already sent (avoid duplicate)
    if (saved.paymentStatus === "paid" && saved.emailSent) {
      return c.json({ success: true, message: "Payment already verified.", alreadyProcessed: true });
    }

    // Emails are handled by Zapier (triggered by Stripe payment success)
    // No need to send emails from here — Zapier sends both customer & admin emails via Gmail

    // Update KV with paid status
    saved.paymentStatus = "paid";
    saved.emailSent = true;
    saved.paidAt = new Date().toISOString();
    saved.stripePaymentIntent = session.payment_intent;
    saved.amountPaid = session.amount_total;
    await kv.set(submissionId, JSON.stringify(saved));

    return c.json({
      success: true,
      message: "Payment verified successfully! Emails will be sent via Zapier.",
      clientEmail: saved.textFields.email || null,
      companyName: saved.textFields.companyName || null,
      amountPaid: session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : null,
    });

  } catch (err: any) {
    console.log(`Payment verification error: ${err.message}`);
    return c.json({ success: false, error: `Payment verification failed: ${err.message}` }, 500);
  }
});

function getPriceFromBudget(budget: string): number {
  // Returns amount in cents
  if (!budget) return 9900; // $99 default
  const lower = budget.toLowerCase();
  if (lower.includes("500") || lower.includes("enterprise") || lower.includes("premium")) return 59900;
  if (lower.includes("300") || lower.includes("professional") || lower.includes("pro")) return 29900;
  if (lower.includes("200")) return 19900;
  if (lower.includes("150")) return 14900;
  return 9900; // $99 starter
}

function buildClientEmailHtml(fields: Record<string, string>, session: any) {
  const amountStr = session?.amount_total ? `$${(session.amount_total / 100).toFixed(2)} ${(session.currency || "usd").toUpperCase()}` : "";
  return `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;">
  <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:30px 32px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;font-weight:700;">✅ Payment Received!</h1>
    <p style="color:#f0abfc;margin:8px 0 0;font-size:15px;">Thank you for choosing XTEC Global</p>
  </div>
  <div style="background:white;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Hi <strong>${fields.ownerName || "there"}</strong>,
    </p>
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
      We have successfully received your payment${amountStr ? ` of <strong>${amountStr}</strong>` : ""} and all your website requirements for <strong>${fields.companyName || "your business"}</strong>.
    </p>
    
    <div style="background:#ecfdf5;border-radius:10px;padding:16px 20px;margin:16px 0;border:1px solid #bbf7d0;">
      <h3 style="margin:0 0 6px;font-size:14px;color:#065f46;">💳 Payment Summary</h3>
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Business: <strong>${fields.companyName || "—"}</strong></p>
      ${amountStr ? `<p style="margin:2px 0;font-size:13px;color:#065f46;">Amount: <strong>${amountStr}</strong></p>` : ""}
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Status: <strong>PAID ✅</strong></p>
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Email: <strong>${fields.email || "—"}</strong></p>
    </div>

    <div style="background:linear-gradient(135deg,#f5f3ff,#fdf2f8);border-radius:12px;padding:24px;margin:20px 0;border:1px solid #e9d5ff;">
      <div style="text-align:center;">
        <p style="font-size:40px;margin:0;">⏰</p>
        <h2 style="color:#7c3aed;margin:8px 0 4px;font-size:20px;">Your Website Will Be Ready in 2 Hours!</h2>
        <p style="color:#6b7280;font-size:14px;margin:0;">We are already working on your website. You will receive another email with your completed website shortly.</p>
      </div>
    </div>

    <div style="background:#f8fafc;border-radius:8px;padding:16px 20px;margin:16px 0;">
      <h3 style="margin:0 0 8px;font-size:14px;color:#475569;">What happens next?</h3>
      <ol style="margin:0;padding-left:20px;color:#64748b;font-size:14px;line-height:1.8;">
        <li>Our team reviews your requirements</li>
        <li>We design and develop your website</li>
        <li>You receive the completed website via email</li>
        <li>We make any revisions you need</li>
      </ol>
    </div>

    <p style="color:#334155;font-size:15px;line-height:1.7;margin:16px 0 0;">
      If you have any questions, feel free to reach out via WhatsApp or email at <a href="mailto:sanant@xtecglobal.com" style="color:#7c3aed;">sanant@xtecglobal.com</a>
    </p>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
    <p style="text-align:center;color:#94a3b8;font-size:12px;margin:0;">XTEC Global — Professional Website Development</p>
  </div>
</div>`;
}

function buildEmailHtml(fields: Record<string, string>, files: { fieldName: string; fileName: string; url: string }[], stripeSession?: any) {
  const f = fields;
  const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const bulletList = (val: string | undefined) => {
    if (!val) return '<p style="color:#94a3b8;margin:4px 0;">—</p>';
    const items = val.split(",").map(s => s.trim()).filter(Boolean);
    if (items.length <= 1) return `<p style="margin:4px 0;color:#334155;">${val}</p>`;
    return `<ul style="margin:4px 0 4px 20px;padding:0;color:#334155;">${items.map(i => `<li style="margin:2px 0;">${i}</li>`).join("")}</ul>`;
  };

  const val = (v: string | undefined) => v ? `<span style="color:#334155;">${v}</span>` : '<span style="color:#94a3b8;">—</span>';

  const fileLinks: Record<string, { fileName: string; url: string }[]> = {};
  for (const file of files) {
    if (!fileLinks[file.fieldName]) fileLinks[file.fieldName] = [];
    fileLinks[file.fieldName].push(file);
  }

  const renderFiles = (key: string, label: string) => {
    const list = fileLinks[key];
    if (!list || list.length === 0) return "";
    return `
      <div style="margin:8px 0;">
        <strong style="color:#475569;">${label}:</strong>
        <ul style="margin:4px 0 4px 20px;padding:0;">
          ${list.map(f => `<li><a href="${f.url}" style="color:#7c3aed;text-decoration:underline;">${f.fileName}</a></li>`).join("")}
        </ul>
      </div>`;
  };

  const paymentInfo = stripeSession ? `
    <div style="background:#ecfdf5;border-radius:10px;padding:16px 20px;margin:16px 0;border:1px solid #bbf7d0;">
      <h3 style="margin:0 0 8px;font-size:14px;color:#065f46;">💳 Payment Information (PAID ✅)</h3>
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Amount: <strong>$${((stripeSession.amount_total || 0) / 100).toFixed(2)} ${(stripeSession.currency || "usd").toUpperCase()}</strong></p>
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Payment ID: ${stripeSession.payment_intent || "—"}</p>
      <p style="margin:2px 0;font-size:13px;color:#065f46;">Customer Email: ${stripeSession.customer_email || f.email || "—"}</p>
    </div>` : "";

  return `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:750px;margin:0 auto;background:#f8fafc;">
  
  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:30px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;font-weight:700;">📄 Website Requirement Document</h1>
    <p style="color:#f0abfc;margin:6px 0 0;font-size:14px;">Generated on ${date} • Payment Confirmed ✅</p>
  </div>

  <div style="background:white;padding:0 32px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">

    <!-- CLIENT INFO BOX -->
    <div style="background:#f1f5f9;border-radius:10px;padding:20px 24px;margin:24px 0;">
      <h2 style="margin:0 0 4px;font-size:18px;color:#1e293b;">${val(f.companyName)}</h2>
      <p style="margin:0;color:#64748b;font-size:14px;">Client: ${val(f.ownerName)}</p>
      <div style="margin-top:12px;display:flex;gap:24px;flex-wrap:wrap;">
        <div style="font-size:13px;color:#475569;">📧 ${val(f.email)}</div>
        <div style="font-size:13px;color:#475569;">📱 ${val(f.phone)}</div>
      </div>
      <div style="margin-top:6px;font-size:13px;color:#475569;">📍 ${[f.address, f.city, f.country].filter(Boolean).join(", ") || "—"}</div>
    </div>

    ${paymentInfo}

    <hr style="border:none;border-top:2px solid #e2e8f0;margin:24px 0;" />

    <!-- SECTION 1 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">1. Business Type & Industry</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Industry:</strong></p>
        ${bulletList(f.businessType)}
        ${f.otherIndustry ? `<p style="margin:4px 0;"><strong style="color:#475569;">Other:</strong> ${val(f.otherIndustry)}</p>` : ""}
      </div>
    </div>

    <!-- SECTION 2 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">2. Website Purpose & Goals</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Goals:</strong></p>
        ${bulletList(f.goals)}
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Target Customer:</strong></p>
        <p style="margin:4px 0;color:#334155;line-height:1.6;">${val(f.targetCustomer)}</p>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">3. Website Pages & Content</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Required Pages:</strong></p>
        ${bulletList(f.pages)}
        ${f.tagline ? `<p style="margin:10px 0 4px;"><strong style="color:#475569;">Tagline:</strong> <em style="color:#334155;">"${f.tagline}"</em></p>` : ""}
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Business Description:</strong></p>
        <div style="background:#f8fafc;border-left:3px solid #cbd5e1;padding:10px 14px;margin:4px 0;border-radius:0 6px 6px 0;color:#334155;line-height:1.6;font-size:14px;">
          ${f.businessDesc || "—"}
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">4. Design & Branding Preferences</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Has Logo:</strong> ${val(f.logo)}</p>
        ${renderFiles("logoFile", "Logo File")}
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Colour Theme:</strong></p>
        ${bulletList(f.colours)}
        ${f.colourDesc ? `<p style="margin:4px 0;"><strong style="color:#475569;">Colour Notes:</strong> ${val(f.colourDesc)}</p>` : ""}
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Style Preference:</strong> ${val(f.stylePref)}</p>
        ${f.refWebsites ? `
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Reference Websites:</strong></p>
        <div style="background:#f8fafc;border-left:3px solid #cbd5e1;padding:10px 14px;margin:4px 0;border-radius:0 6px 6px 0;color:#334155;font-size:14px;">
          ${f.refWebsites}
        </div>` : ""}
      </div>
    </div>

    <!-- SECTION 5 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">5. Domain & Technical Details</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Domain Ownership:</strong> ${val(f.domainOwnership)}</p>
        ${f.domainName ? `<p style="margin:4px 0;"><strong style="color:#475569;">Domain:</strong> ${val(f.domainName)}</p>` : ""}
        ${f.currentWebsite ? `<p style="margin:4px 0;"><strong style="color:#475569;">Current Website:</strong> <a href="${f.currentWebsite}" style="color:#7c3aed;">${f.currentWebsite}</a></p>` : ""}
        ${f.socialLink ? `<p style="margin:4px 0;"><strong style="color:#475569;">Social Media:</strong> <a href="${f.socialLink}" style="color:#7c3aed;">${f.socialLink}</a></p>` : ""}
        <p style="margin:10px 0 4px;"><strong style="color:#475569;">Required Features:</strong></p>
        ${bulletList(f.features)}
      </div>
    </div>

    <!-- SECTION 6 -->
    ${files.length > 0 ? `
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">6. Uploaded Files & Assets</h3>
      <div style="padding-left:16px;background:#f8fafc;border-radius:8px;padding:16px 20px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Content Provided:</strong></p>
        ${bulletList(f.content)}
        ${renderFiles("logoFile", "🖼 Logo")}
        ${renderFiles("businessPhotos", "🏢 Business Photos")}
        ${renderFiles("teamPhotos", "👥 Team Photos")}
        ${renderFiles("productPhotos", "📦 Product Photos")}
        ${renderFiles("otherFiles", "📎 Other Documents")}
      </div>
    </div>` : `
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">6. Content & Files</h3>
      <div style="padding-left:16px;">
        <p style="margin:4px 0;"><strong style="color:#475569;">Content Provided:</strong></p>
        ${bulletList(f.content)}
        <p style="margin:4px 0;color:#94a3b8;font-style:italic;">No files uploaded.</p>
      </div>
    </div>`}

    <!-- SECTION 7 -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:15px;color:#7c3aed;margin:0 0 10px;border-left:4px solid #7c3aed;padding-left:12px;">7. Budget & Timeline</h3>
      <div style="padding-left:16px;">
        <div style="display:flex;gap:32px;flex-wrap:wrap;">
          <div style="background:#f1f5f9;border-radius:8px;padding:12px 20px;flex:1;min-width:200px;">
            <p style="margin:0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Budget</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#1e293b;">${f.budget || "—"}</p>
          </div>
          <div style="background:#f1f5f9;border-radius:8px;padding:12px 20px;flex:1;min-width:200px;">
            <p style="margin:0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Timeline</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#1e293b;">${f.timeline || "—"}</p>
          </div>
        </div>
        ${f.otherRequirements ? `
        <p style="margin:14px 0 4px;"><strong style="color:#475569;">Additional Requirements:</strong></p>
        <div style="background:#f8fafc;border-left:3px solid #cbd5e1;padding:10px 14px;margin:4px 0;border-radius:0 6px 6px 0;color:#334155;line-height:1.6;font-size:14px;">
          ${f.otherRequirements}
        </div>` : ""}
      </div>
    </div>

    <!-- FOOTER NOTE -->
    <div style="background:#ecfdf5;border-radius:8px;padding:16px 20px;margin-top:20px;border:1px solid #bbf7d0;">
      <p style="margin:0;color:#065f46;font-size:14px;">⏰ <strong>Action Required:</strong> Client ko 2 ghante ke andar website ready karke mail karni hai.</p>
    </div>

    <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:20px;">This document was auto-generated by XTEC Global Website Requirement System</p>

  </div>
</div>`;
}

Deno.serve(app.fetch);