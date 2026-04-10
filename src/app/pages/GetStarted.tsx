import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  TextInput,
  TextArea,
  CheckboxGroup,
  RadioGroup,
  SelectInput,
  FileUpload,
} from "../components/form-fields";
import {
  businessTypes,
  websiteGoals,
  websitePages,
  logoOptions,
  colourThemes,
  stylePreferences,
  domainOptions,
  websiteFeatures,
  contentFiles,
  budgetOptions,
  timelineOptions,
} from "../components/form-data";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { motion } from "motion/react";

const TOTAL_STEPS = 8;
const sectionTitles = [
  "Business Information",
  "Business Type & Industry",
  "Website Purpose & Goals",
  "Website Content & Pages",
  "Design & Branding Preferences",
  "Domain & Technical Details",
  "Content & Files",
  "Budget & Timeline",
];

export function GetStarted() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState<string[]>(
    [],
  );
  const [otherIndustry, setOtherIndustry] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [targetCustomer, setTargetCustomer] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [tagline, setTagline] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [logo, setLogo] = useState("");
  const [colours, setColours] = useState<string[]>([]);
  const [colourDesc, setColourDesc] = useState("");
  const [stylePref, setStylePref] = useState("");
  const [refWebsites, setRefWebsites] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [businessPhotos, setBusinessPhotos] = useState<File[]>(
    [],
  );
  const [teamPhotos, setTeamPhotos] = useState<File[]>([]);
  const [productPhotos, setProductPhotos] = useState<File[]>(
    [],
  );
  const [otherFiles, setOtherFiles] = useState<File[]>([]);
  const [domainOwnership, setDomainOwnership] = useState("");
  const [domainName, setDomainName] = useState("");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [otherRequirements, setOtherRequirements] =
    useState("");

  const next = () =>
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("ownerName", ownerName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("address", address);
      formData.append("businessType", businessType.join(", "));
      formData.append("otherIndustry", otherIndustry);
      formData.append("goals", goals.join(", "));
      formData.append("targetCustomer", targetCustomer);
      formData.append("pages", pages.join(", "));
      formData.append("tagline", tagline);
      formData.append("businessDesc", businessDesc);
      formData.append("logo", logo);
      formData.append("colours", colours.join(", "));
      formData.append("colourDesc", colourDesc);
      formData.append("stylePref", stylePref);
      formData.append("refWebsites", refWebsites);
      formData.append("domainOwnership", domainOwnership);
      formData.append("domainName", domainName);
      formData.append("currentWebsite", currentWebsite);
      formData.append("socialLink", socialLink);
      formData.append("features", features.join(", "));
      formData.append("content", content.join(", "));
      formData.append("budget", budget);
      formData.append("timeline", timeline);
      formData.append("otherRequirements", otherRequirements);

      logoFiles.forEach((f) => formData.append("logoFile", f));
      businessPhotos.forEach((f) =>
        formData.append("businessPhotos", f),
      );
      teamPhotos.forEach((f) =>
        formData.append("teamPhotos", f),
      );
      productPhotos.forEach((f) =>
        formData.append("productPhotos", f),
      );
      otherFiles.forEach((f) =>
        formData.append("otherFiles", f),
      );

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5ca68e05/submit-form`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${publicAnonKey}` },
          body: formData,
        },
      );
      const data = await res.json();
      console.log("Submit response:", data);
      if (data.success && data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        setSubmitError(
          data.error || "Submission failed. Please try again.",
        );
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sections: React.ReactNode[] = [
    <div key="s1">
      <TextInput
        label="Business / Company Name"
        required
        placeholder="e.g. Singh Electricals Pvt Ltd"
        value={companyName}
        onChange={setCompanyName}
      />
      <TextInput
        label="Owner / Contact Person Name"
        required
        placeholder="e.g. Harpreet Singh"
        value={ownerName}
        onChange={setOwnerName}
      />
      <TextInput
        label="Email Address"
        required
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={setEmail}
      />
      <TextInput
        label="Phone / WhatsApp Number"
        required
        type="tel"
        placeholder="e.g. +91 98765 43210"
        value={phone}
        onChange={setPhone}
      />
      <TextInput
        label="City / Location"
        required
        placeholder="e.g. Patiala, Punjab"
        value={city}
        onChange={setCity}
      />
      <TextInput
        label="Country"
        placeholder="e.g. India / Australia"
        value={country}
        onChange={setCountry}
      />
      <TextArea
        label="Business Street Address"
        placeholder="Full address where business operates"
        value={address}
        onChange={setAddress}
      />
    </div>,
    <div key="s2">
      <CheckboxGroup
        label="What type of business do you have?"
        required
        options={businessTypes}
        selected={businessType}
        onChange={setBusinessType}
      />
      <TextInput
        label='If "Other" — please specify your industry'
        placeholder="Your business type..."
        value={otherIndustry}
        onChange={setOtherIndustry}
      />
    </div>,
    <div key="s3">
      <CheckboxGroup
        label="Main goal of your website?"
        required
        options={websiteGoals}
        selected={goals}
        onChange={setGoals}
      />
      <TextArea
        label="Who is your target customer?"
        required
        placeholder="e.g. Homeowners in Sydney aged 30-55 looking for plumbing services"
        value={targetCustomer}
        onChange={setTargetCustomer}
      />
    </div>,
    <div key="s4">
      <CheckboxGroup
        label="Which pages do you need on your website?"
        required
        options={websitePages}
        selected={pages}
        onChange={setPages}
      />
      <TextInput
        label="Business Tagline or Slogan (if any)"
        placeholder="e.g. Your trusted local electrician since 1998"
        value={tagline}
        onChange={setTagline}
      />
      <TextArea
        label="Describe your business & what makes you different from competitors"
        required
        placeholder="What you do, who you serve, what makes you special..."
        value={businessDesc}
        onChange={setBusinessDesc}
      />
    </div>,
    <div key="s5">
      <RadioGroup
        label="Do you have a logo?"
        required
        options={logoOptions}
        selected={logo}
        onChange={setLogo}
      />
      <FileUpload
        label="Upload your Logo"
        hint="If you have a logo, upload it here (PNG, SVG preferred)"
        accept="image/*,.svg,.pdf"
        multiple={false}
        files={logoFiles}
        onChange={setLogoFiles}
      />
      <CheckboxGroup
        label="Preferred colour theme for your website"
        options={colourThemes}
        selected={colours}
        onChange={setColours}
      />
      <TextInput
        label="Describe your colour / style preference"
        placeholder="e.g. Dark blue and white, clean and modern like a bank website..."
        value={colourDesc}
        onChange={setColourDesc}
      />
      <RadioGroup
        label="Website style preference"
        required
        options={stylePreferences}
        selected={stylePref}
        onChange={setStylePref}
      />
      <TextArea
        label="Reference websites you like (paste 1–3 links)"
        placeholder="e.g. https://www.apple.com  /  https://www.canva.com"
        value={refWebsites}
        onChange={setRefWebsites}
      />
    </div>,
    <div key="s6">
      <RadioGroup
        label="Do you already own a domain name (website address)?"
        required
        options={domainOptions}
        selected={domainOwnership}
        onChange={setDomainOwnership}
      />
      <TextInput
        label="Your domain name (if you have one)"
        placeholder="e.g. www.mybusiness.com.au"
        value={domainName}
        onChange={setDomainName}
      />
      <TextInput
        label="Current website URL (if any)"
        placeholder="https://..."
        value={currentWebsite}
        onChange={setCurrentWebsite}
      />
      <TextInput
        label="Facebook / Instagram Page Link"
        placeholder="https://facebook.com/yourpage"
        value={socialLink}
        onChange={setSocialLink}
      />
      <CheckboxGroup
        label="Which features do you need on your website?"
        options={websiteFeatures}
        selected={features}
        onChange={setFeatures}
      />
    </div>,
    <div key="s7">
      <CheckboxGroup
        label="What content / files can you provide to us?"
        required
        options={contentFiles}
        selected={content}
        onChange={setContent}
      />
      <FileUpload
        label="Upload Business Photos / Images"
        hint="Shop, office, or work photos to display on the website"
        files={businessPhotos}
        onChange={setBusinessPhotos}
      />
      <FileUpload
        label="Upload Team / Staff Photos"
        hint="Photos of team members (optional)"
        files={teamPhotos}
        onChange={setTeamPhotos}
      />
      <FileUpload
        label="Upload Product Photos"
        hint="Upload product images if you want to sell online"
        files={productPhotos}
        onChange={setProductPhotos}
      />
      <FileUpload
        label="Upload Any Other Files"
        hint="Pricing list, content documents, brochures, etc."
        accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
        files={otherFiles}
        onChange={setOtherFiles}
      />
    </div>,
    <div key="s8">
      <SelectInput
        label="What is your budget for this website?"
        required
        options={budgetOptions}
        value={budget}
        onChange={setBudget}
      />
      <SelectInput
        label="When do you need the website completed?"
        required
        options={timelineOptions}
        value={timeline}
        onChange={setTimeline}
      />
      <TextArea
        label="Any other requirements or special requests?"
        placeholder="Write anything else we should know..."
        value={otherRequirements}
        onChange={setOtherRequirements}
      />
    </div>,
  ];

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
            Website Requirement Form
          </h1>
          <p className="text-slate-500">
            Fill in your details so we can build the perfect
            website for you
          </p>
        </div>

        <div className="flex items-center gap-1 mb-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-slate-200"}`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/30 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">
              Section {step + 1} — {sectionTitles[step]}
            </h2>
            <span className="text-violet-200 text-sm font-medium">
              {step + 1} / {TOTAL_STEPS}
            </span>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              {sections[step]}
            </motion.div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    Pay & Submit <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        {submitError && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm text-center">
            {submitError}
          </div>
        )}
      </div>
    </div>
  );
}