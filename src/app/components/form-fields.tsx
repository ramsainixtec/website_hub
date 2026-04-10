import React from "react";
import { Check, UploadCloud, X, FileText, Image as ImageIcon } from "lucide-react";

interface TextInputProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

export function TextInput({ label, required, placeholder, type = "text", value, onChange }: TextInputProps) {
  return (
    <div className="mb-5">
      <label className="block mb-1.5 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 transition bg-slate-50/50 text-slate-800 placeholder:text-slate-300"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

export function TextArea({ label, required, placeholder, value, onChange }: TextAreaProps) {
  return (
    <div className="mb-5">
      <label className="block mb-1.5 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        required={required}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 transition resize-y bg-slate-50/50 text-slate-800 placeholder:text-slate-300"
      />
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}

export function CheckboxGroup({ label, required, options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="mb-5">
      <label className="block mb-2 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl border transition-all duration-200 text-sm ${
                isSelected
                  ? "border-violet-400 bg-violet-50 text-violet-700 shadow-sm shadow-violet-100"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isSelected ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 border-violet-500" : "border-slate-300"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface RadioGroupProps {
  label: string;
  required?: boolean;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}

export function RadioGroup({ label, required, options, selected, onChange }: RadioGroupProps) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl border transition-all duration-200 text-sm ${
                isSelected
                  ? "border-violet-400 bg-violet-50 text-violet-700 shadow-sm shadow-violet-100"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? "border-violet-500" : "border-slate-300"
                }`}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SelectInputProps {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export function SelectInput({ label, required, options, value, onChange }: SelectInputProps) {
  return (
    <div className="mb-5">
      <label className="block mb-1.5 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 transition bg-slate-50/50 text-slate-800"
      >
        <option value="">Select an option...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface FileUploadProps {
  label: string;
  required?: boolean;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
}

export function FileUpload({ label, required, hint, accept = "image/*,.pdf,.svg,.png,.jpg,.jpeg,.webp", multiple = true, files, onChange }: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onChange(multiple ? [...files, ...newFiles] : newFiles);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <div className="mb-5">
      <label className="block mb-1.5 text-slate-700 text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {hint && <p className="text-slate-400 text-sm mb-2">{hint}</p>}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            onChange(multiple ? [...files, ...newFiles] : newFiles);
          }
        }}
        className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-5 h-5 text-violet-500" />
        </div>
        <p className="text-slate-500 text-sm">Click to upload or drag & drop</p>
        <p className="text-slate-400 text-xs mt-1">PNG, JPG, SVG, PDF supported</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, i) => (
            <div key={`${file.name}-${i}`} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              {isImage(file) ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-violet-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="p-1.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
