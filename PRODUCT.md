# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Patients and families in the Gulf / Middle East who want to see a doctor without travelling to a clinic. Mostly arriving on a phone, often from a WhatsApp or social link, and usually booking for themselves or a family member.

## Product Purpose

Al Hanna United Care offers general online medical services: video consultations, specialist care, lab tests, digital prescriptions and follow-ups. The website exists to explain those services clearly, introduce the doctors, and turn a visit into an appointment request. The clinic then confirms the time by phone or WhatsApp. Success means a patient submits a valid appointment request (name, phone/WhatsApp, service, preferred date).

## Positioning

A real clinic team that brings its care online: patients get their own doctor's attention from home, without the travel or the waiting room. It is not an anonymous telehealth marketplace.

## Operating Context

- Booking is a request, not instant scheduling. Staff confirm by phone or WhatsApp.
- Services, doctors and clinic settings (name, phone, WhatsApp, email, address, hours) are managed in the backend admin and fetched from `NEXT_PUBLIC_API_URL`. Any of these can be empty.
- Online consultations are not for emergencies. That disclaimer must stay visible on booking and in the footer.

## Capabilities and Constraints

- Next.js 16 (App Router, cacheComponents) with Tailwind CSS 4. No other UI libraries.
- Routes: `/`, `/services`, `/how-it-works`, `/doctors`, `/contact`, `/book`, and the 404 page.
- Service icons are chosen by key: video, heart, flask, file, users, chat.
- English only for now. Arabic/RTL is likely later, so layouts should not block it.

## Brand Commitments

- Name: Al Hanna United Care (can be overridden by the backend `clinicName`).
- No logo yet. The current "+" tile is a placeholder.
- Visual direction (chosen 2026-11-17): the category-standard private-clinic site, done at full craft. It should be clean, calm and clinical, and must not look AI-generated. Quality benchmarks: Cleveland Clinic Abu Dhabi and One Medical.

## Evidence on Hand

None yet: no clinic photos, no logo, no testimonials, no statistics. Doctor photos may arrive through the admin. Do not invent reviews, patient counts, ratings, accreditations or prices.

## Product Principles

1. Booking is always one tap away, on every screen size.
2. Calm and clear before clever: patients may be unwell or worried.
3. Show only what is true, and leave empty states graceful when admin data is missing.
4. WhatsApp and phone are first-class channels, not footnotes.

## Accessibility & Inclusion

Patients of all ages on mid-range phones. Aim for WCAG 2.2 AA contrast, large tap targets, and readable body text.
