"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { sendMessage } from "@/services/messageService";

const TOPICS = [
  { value: "general", label: "General question" },
  { value: "appointment", label: "An existing appointment" },
  { value: "prescription", label: "Prescription or refill" },
  { value: "reports", label: "Lab results or reports" },
  { value: "other", label: "Something else" },
];

const MAX = 2000;
const EMPTY = { fullName: "", phone: "", email: "", topic: "general", message: "", website: "" };

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          <Icon name="alert" className="mt-0.5 h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });
    setErrors({});
    try {
      const res = await sendMessage(form);
      setStatus({ type: "success", message: res.message });
      setForm(EMPTY);
    } catch (err) {
      const fieldErrors = Object.fromEntries((err.errors || []).map((x) => [x.field, x.message]));
      setErrors(fieldErrors);
      setStatus({ type: "error", message: err.message });
    }
  };

  const inputProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: `field-input ${errors[name] ? "!border-danger focus:!ring-danger/15" : ""}`,
  });

  if (status.type === "success") {
    return (
      <div role="status" className="panel px-6 py-12 text-center sm:py-16">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.25} />
        </span>
        <h2 className="mt-5 text-2xl font-semibold">Message sent</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">{status.message}</p>
        <button type="button" className="btn-secondary mt-7" onClick={() => setStatus({ type: "idle", message: "" })}>
          Send another message
        </button>
      </div>
    );
  }

  const loading = status.type === "loading";

  return (
    <div className="panel p-5 sm:p-8">
      <h2 className="text-2xl font-semibold">Send us a message</h2>
      <p className="mt-1.5 text-muted">We usually reply by phone or WhatsApp during opening hours.</p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2" noValidate>
        <div className="sm:col-span-2">
          <Field id="fullName" label="Full name" error={errors.fullName}>
            <input {...inputProps("fullName")} autoComplete="name" required />
          </Field>
        </div>

        <Field id="phone" label="Phone or WhatsApp" error={errors.phone}>
          <input {...inputProps("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" required />
        </Field>

        <Field id="email" label="Email" optional error={errors.email}>
          <input {...inputProps("email")} type="email" inputMode="email" autoComplete="email" />
        </Field>

        <div className="sm:col-span-2">
          <Field id="topic" label="What is it about?" error={errors.topic}>
            <select {...inputProps("topic")}>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="message" label="Message" error={errors.message}>
            <textarea
              {...inputProps("message")}
              rows={5}
              maxLength={MAX}
              required
              className={`${inputProps("message").className} h-auto min-h-36 resize-y py-3`}
            />
          </Field>
          <p className={`mt-1.5 text-right text-[0.8125rem] tabular-nums ${form.message.length > MAX - 100 ? "text-danger" : "text-muted"}`}>
            {form.message.length} / {MAX}
          </p>
        </div>

        {/* Honeypot for bots; hidden from people and screen readers */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
        </div>

        <p className="flex items-start gap-2 rounded-[10px] border border-warn-line bg-warn-bg px-3.5 py-3 text-sm text-warn-ink sm:col-span-2">
          <Icon name="alert" className="mt-0.5 h-4 w-4" />
          Please don’t use this form for urgent medical problems. In an emergency, go to the nearest hospital.
        </p>

        {status.type === "error" && Object.keys(errors).length === 0 && (
          <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-danger-bg px-3.5 py-3 text-sm text-danger sm:col-span-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4" />
            {status.message}
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto sm:min-w-48" disabled={loading}>
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send message <Icon name="arrow" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
