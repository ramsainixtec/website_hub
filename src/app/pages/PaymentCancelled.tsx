import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { XCircle, ArrowRight, RotateCcw } from "lucide-react";

export function PaymentCancelled() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-10 text-center max-w-md w-full border border-slate-100"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-200">
          <XCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Cancelled</h2>
        <p className="text-slate-500 mb-6">
          No worries! Your form data has been saved. You can go back and complete the payment whenever you're ready.
        </p>

        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100 text-left">
          <p className="text-amber-800 text-sm">
            💡 <strong>Your details are safe.</strong> You don't need to fill the form again — just go back to Get Started and resubmit to proceed with payment.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all"
          >
            Go Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
