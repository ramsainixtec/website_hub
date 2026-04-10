import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle2, Loader2, Mail, Clock, ArrowRight, AlertCircle } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const submissionId = searchParams.get("submission_id");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<{
    clientEmail?: string;
    companyName?: string;
    amountPaid?: string;
  }>({});

  useEffect(() => {
    console.log("PaymentSuccess mounted, sessionId:", sessionId, "submissionId:", submissionId);

    if (!sessionId || !submissionId) {
      setStatus("error");
      setErrorMsg("Invalid payment session. Missing session_id or submission_id in URL. Please contact support.");
      return;
    }

    let cancelled = false;

    const verifyPayment = async () => {
      try {
        console.log("Calling verify-payment API...");
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5ca68e05/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ sessionId, submissionId }),
          }
        );

        const data = await res.json();
        console.log("Payment verification response:", data);

        if (cancelled) return;

        if (data.success) {
          setStatus("success");
          setPaymentInfo({
            clientEmail: data.clientEmail || undefined,
            companyName: data.companyName || undefined,
            amountPaid: data.amountPaid || undefined,
          });
        } else {
          setStatus("error");
          setErrorMsg(data.error || "Payment verification failed.");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(`Network error: ${err.message || "Please contact support."}`);
        }
      }
    };

    verifyPayment();
    return () => { cancelled = true; };
  }, [sessionId, submissionId]);

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 flex items-center justify-center p-4">
      {status === "verifying" && (
        <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-10 text-center max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center mx-auto mb-5">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Verifying Payment...</h2>
          <p className="text-slate-500">Please wait while we confirm your payment and send the confirmation email.</p>
        </div>
      )}

      {status === "success" && (
        <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-10 text-center max-w-lg w-full border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Payment Successful! 🎉</h2>
          <p className="text-slate-500 mb-6">Thank you for your order. Your payment has been confirmed.</p>

          {/* Payment summary */}
          {(paymentInfo.companyName || paymentInfo.amountPaid || paymentInfo.clientEmail) && (
            <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100 text-left">
              <div className="space-y-3 text-sm">
                {paymentInfo.companyName && (
                  <div>
                    <p className="text-emerald-600 font-medium text-xs uppercase tracking-wide">Business</p>
                    <p className="text-slate-800 font-semibold">{paymentInfo.companyName}</p>
                  </div>
                )}
                {paymentInfo.amountPaid && (
                  <div>
                    <p className="text-emerald-600 font-medium text-xs uppercase tracking-wide">Amount Paid</p>
                    <p className="text-slate-800 font-semibold">{paymentInfo.amountPaid}</p>
                  </div>
                )}
                {paymentInfo.clientEmail && (
                  <div>
                    <p className="text-emerald-600 font-medium text-xs uppercase tracking-wide">Confirmation Sent To</p>
                    <p className="text-slate-800 font-semibold">{paymentInfo.clientEmail}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 text-left space-y-4 border border-violet-100 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Website Ready in 2 Hours!</p>
                <p className="text-violet-600 text-sm mt-0.5">Our team has started working on your website. You'll receive the completed website via email.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Check Your Email</p>
                <p className="text-violet-600 text-sm mt-0.5">We've sent a confirmation email with all the details. Please check your inbox (and spam folder).</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm mb-2">What Happens Next?</h3>
            <ol className="text-left text-sm text-slate-500 space-y-1.5 list-decimal list-inside">
              <li>Our design team reviews your requirements</li>
              <li>We build your custom website</li>
              <li>You receive the website link via email within 2 hours</li>
              <li>Request any revisions — we'll make them for free!</li>
            </ol>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-7 py-3 rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all duration-300"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-10 text-center max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Verification Issue</h2>
          <p className="text-slate-500 mb-4">{errorMsg}</p>
          <p className="text-sm text-slate-400 mb-6">
            Don't worry — if your payment went through, please contact us at{" "}
            <a href="mailto:sanant@xtecglobal.com" className="text-violet-600 underline">sanant@xtecglobal.com</a>{" "}
            and we'll sort it out immediately.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all">
              Try Again
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">
              Go Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}