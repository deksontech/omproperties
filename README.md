# OMProperties

OMProperties is a React/Vite MVP for a premium real estate advisory and turnkey project platform. It includes public property discovery, turnkey service pages, lead capture, and a frontend-only admin panel using localStorage mock persistence.

The public website uses a shared premium design system with a consistent header, footer, warm background, charcoal/gold palette, Playfair Display headings, Inter body text, responsive cards, polished forms, and conversion-focused CTAs.

## Tech Stack

- React 19
- Vite
- React Router
- Lucide React icons
- Oxlint
- localStorage mock services

## Setup

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run lint
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` and fill values as needed.

```bash
VITE_APP_NAME=OMProperties
VITE_CONTACT_PHONE=+91 96942 60049
VITE_WHATSAPP_NUMBER=919694260049
VITE_CONTACT_EMAIL=Omproperties0049@gmail.com
VITE_OFFICE_ADDRESS=Shop No A1, Omwati Commercials Dheeriyawas, next to Trehan Residences, Tapukara, Bhiwadi, Rajasthan 301707
VITE_GOOGLE_MAP_URL=https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28153.38548558337!2d76.8211183871208!3d28.11075282200989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3561fe1103a3%3A0xdf5658059384c5be!2sOM%20PROPERTIES%20%26%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1783622885132!5m2!1sen!2sin
VITE_GOOGLE_MAP_LINK=https://share.google/CYBymKEm2YbWd83bz
```

Do not commit real secrets to this project. The current variables are public-facing contact/config values only.

## Temporary Admin Login

These credentials are temporary frontend-only mock auth credentials and must be replaced with backend authentication before production launch.

- Email: `admin@omproperties.com`
- Password: `Admin@123`

## Routes

- `/` Homepage
- `/properties` Property listing and filters
- `/saved-properties` Visitor-saved property shortlist
- `/compare-properties` Property comparison table
- `/property/:slug` Property detail
- `/turnkey` Turnkey services
- `/turnkey-cost-estimator` Frontend turnkey project estimate tool
- `/turnkey/:slug` Turnkey service detail
- `/about` About page
- `/contact` Contact page
- `/admin/login` Admin login
- `/admin` Admin dashboard
- `/admin/properties` Property management
- `/admin/turnkey` Turnkey service management
- `/admin/leads` Lead management

## Deployment

1. Set environment variables on the hosting platform.
2. Run `npm run build`.
3. Deploy the `dist` folder.
4. Ensure SPA fallback is enabled so direct refresh works for routes such as `/properties`, `/property/:slug`, and `/admin/login`. This repo includes:
   - `public/_redirects` for Netlify-style hosts
   - `vercel.json` rewrites for Vercel
5. After deployment, verify the public contact number, WhatsApp number, email address, and Google Map URL are correct in the deployed environment.

## Pre-Deployment QA

Run these checks before each production deployment:

```bash
npm run lint
npm run build
```

Recommended smoke test:

- Public pages: `/`, `/properties`, `/property/:slug`, `/turnkey`, `/turnkey/:slug`, `/about`, `/contact`
- Admin pages: `/admin/login`, `/admin`, `/admin/properties`, `/admin/turnkey`, `/admin/leads`
- Query filters: `/properties?purpose=buy&type=villa&location=gurugram&budget=50000000`
- Lead capture: submit a contact/property/turnkey enquiry and verify it appears in admin leads
- Admin CRUD: create, edit, feature/unfeature, and delete a property and turnkey service
- Responsive: check mobile, tablet, and desktop widths

## Current Limitations

This MVP intentionally uses browser localStorage for admin auth, properties, turnkey services, and leads. Data is device/browser-specific and should be replaced before a real production launch.

## Future Backend Plan

The frontend is structured around service boundaries so localStorage can be replaced with backend APIs later.

- Node.js and Express REST API
- MySQL persistence
- JWT authentication and role-based admin access
- Cloudinary image upload
- Property CRUD
- Turnkey service CRUD
- Lead management and status workflows
- Server-side validation and audit logging
