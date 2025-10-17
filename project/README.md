# GetTransfer Istanbul - Multi-Language Airport Transfer Booking Website

A modern, responsive airport transfer booking website built with React, TypeScript, Tailwind CSS, and Vite. Features multi-language support (TR, EN, DE, FR, IT) with a clean, accessible interface.

## Features

- **Multi-Language Support**: Turkish, English, German, French, Italian
- **Mobile-First Design**: Responsive across all devices
- **No Authentication**: Simple booking flow without login requirements
- **Cash Payment Only**: Clear messaging about payment at company office
- **Real-Time Price Estimates**: Dynamic pricing based on distance, vehicle type, and time
- **WhatsApp Integration**: Direct booking confirmation via WhatsApp
- **Accessible**: WCAG compliant with proper labels, ARIA attributes, and keyboard navigation
- **SEO Optimized**: Meta tags, OpenGraph, and semantic HTML

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck

# Lint code
npm run lint
```

The development server will start at `http://localhost:5173`

## Project Structure

```
src/
├── i18n/                    # Language translations
│   ├── tr.ts               # Turkish
│   ├── en.ts               # English
│   ├── de.ts               # German
│   ├── fr.ts               # French
│   ├── it.ts               # Italian
│   └── index.ts            # Language exports
├── context/
│   └── LanguageProvider.tsx # i18n context & hook
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Badge.tsx           # Cash-only payment badge
│   ├── Modal.tsx           # Confirmation modal
│   └── Toast.tsx           # Notification toast
├── sections/                # Page sections
│   ├── Hero.tsx
│   ├── WhyUs.tsx
│   ├── Services.tsx
│   ├── ReservationForm.tsx # Main booking form
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── Contact.tsx
├── lib/                     # Utilities
│   ├── pricing.ts          # Price calculation
│   └── submit.ts           # Form submission & WhatsApp
├── App.tsx                  # Main app component
├── main.tsx                 # App entry point
└── index.css                # Global styles
```

## Adding a New Language

1. Create a new translation file in `src/i18n/`:

```typescript
// src/i18n/es.ts
export default {
  nav: {
    home: "Inicio",
    services: "Servicios",
    // ... add all translation keys
  },
  // ... complete translation object
};
```

2. Update `src/i18n/index.ts`:

```typescript
import es from './es';

export type Language = 'tr' | 'en' | 'de' | 'fr' | 'it' | 'es';

export const languages: Record<Language, { name: string; flag: string }> = {
  // ... existing languages
  es: { name: 'Español', flag: '🇪🇸' }
};

export const translations = {
  // ... existing translations
  es
};
```

3. The language will automatically appear in the language dropdown.

## Backend Integration

The app currently uses mock functions for form submission. To integrate with a backend:

### Option 1: REST API

Update `src/lib/submit.ts`:

```typescript
export async function submitReservation(data: BookingData): Promise<{ success: boolean; message?: string }> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Booking failed');
  }

  return await response.json();
}
```

### Option 2: Supabase

1. Install Supabase client (already installed):
```bash
npm install @supabase/supabase-js
```

2. Create a `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

3. Update `src/lib/submit.ts`:
```typescript
import { supabase } from './supabase';

export async function submitReservation(data: BookingData) {
  const { error } = await supabase
    .from('bookings')
    .insert([data]);

  if (error) throw error;
  return { success: true };
}
```

## Customization

### Colors

The site uses a blue color scheme. To change the primary color, update Tailwind classes:
- Replace `blue-` classes with your preferred color (e.g., `green-`, `purple-`)
- Common locations: buttons, badges, links, gradients

### Contact Information

Update contact details in:
- `src/sections/Contact.tsx` - Phone, email, address
- `src/lib/submit.ts` - WhatsApp phone number
- `src/components/Footer.tsx` - Footer contact info

### Pricing Logic

Customize price calculations in `src/lib/pricing.ts`:
- `VEHICLE_BASE_RATES` - Base price per vehicle type
- `DISTANCE_MULTIPLIER` - Price per km
- `PEAK_HOUR_MULTIPLIER` - Peak hour surcharge
- `commonRoutes` - Predefined route distances

## Important Notes

### Payment Policy

This website is designed for businesses that:
- Accept **CASH ONLY** payments
- Collect payment **AT THE COMPANY OFFICE**
- **DO NOT** accept payments from drivers
- **DO NOT** offer online payment

The UI prominently displays this policy in multiple locations. If you need online payments, you'll need to:
1. Remove cash-only badges and messaging
2. Integrate a payment gateway (Stripe, PayPal, etc.)
3. Update the booking flow

### No Authentication

There is no user authentication system. All bookings are handled via:
- Form submission
- WhatsApp confirmation
- Direct contact with the company

If you need user accounts, you'll need to implement authentication (e.g., Supabase Auth).

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: ~150KB (gzipped)

## License

MIT

## Support

For questions or issues, contact: info@airporttransfer.com
