"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { createAppointment } from "@/services/appointmentService";

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          <Icon name="alert" className="mt-0.5 h-4 w-4" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function AppointmentForm({ services = [], title = "Request an appointment", className = "" }) {
  const initial = { fullName: "", phone: "", service: services[0]?._id || "", preferredDate: "" };
  const [form, setForm] = useState(initial);
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
      const res = await createAppointment(form);
      setStatus({ type: "success", message: res.message });
      setForm(initial);
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

  const loading = status.type === "loading";

  return (
    <div className={`panel p-5 shadow-lift sm:p-7 ${className}`}>
      {status.type === "success" ? (
        <div role="status" className="py-6 text-center sm:py-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Icon name="check" className="h-7 w-7" strokeWidth={2.25} />
          </span>
          <h2 className="mt-5 text-2xl font-semibold">Request received</h2>
          <p className="mx-auto mt-2 max-w-xs text-muted">
            {status.message || "We will call or message you on WhatsApp to confirm your appointment time."}
          </p>
          <button
            type="button"
            className="btn-secondary mt-7"
            onClick={() => setStatus({ type: "idle", message: "" })}
          >
            Book another appointment
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-[1.375rem] font-semibold sm:text-2xl">{title}</h2>
          <p className="mt-1.5 text-[0.9375rem] text-muted">
            Takes under a minute. We confirm your time by phone or WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
            <div className="sm:col-span-2">
              <Field id="fullName" label="Full name" error={errors.fullName}>
                <input {...inputProps("fullName")} autoComplete="name" required />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field id="phone" label="Phone or WhatsApp number" error={errors.phone}>
                <input
                  {...inputProps("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+971 50 123 4567"
                  required
                />
              </Field>
            </div>

            <Field id="service" label="Service" error={errors.service}>
              <select {...inputProps("service")} required disabled={services.length === 0}>
                {services.length === 0 && <option value="">No services available yet</option>}
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="preferredDate" label="Preferred date" error={errors.preferredDate}>
              <input
                {...inputProps("preferredDate")}
                type="date"
                onFocus={(e) => (e.target.min = todayISO())}
                required
              />
            </Field>

            {status.type === "error" && Object.keys(errors).length === 0 && (
              <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-danger-bg px-3.5 py-3 text-sm text-danger sm:col-span-2">
                <Icon name="alert" className="mt-0.5 h-4 w-4" />
                {status.message}
              </p>
            )}

            <button type="submit" className="btn-primary mt-1 w-full sm:col-span-2" disabled={loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                  Sending request…
                </>
              ) : (
                <>
                  Request appointment
                  <Icon name="arrow" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
