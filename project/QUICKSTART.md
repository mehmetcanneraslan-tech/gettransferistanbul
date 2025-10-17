# Quick Start Guide

## Get Running in 2 Minutes

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:5173` - Your site is live!

## What You Get

- **5 Languages**: Switch between TR, EN, DE, FR, IT in real-time
- **Booking Form**: Full-featured reservation form with price estimates
- **Mobile Ready**: Works perfectly on all devices
- **WhatsApp**: Direct booking confirmation via WhatsApp
- **No Setup Required**: No database, no auth, no API keys needed

## First Customizations

### 1. Change Contact Information

**File**: `src/sections/Contact.tsx`
```typescript
// Update these values:
  value: '+90 536 429 12 21',  // Your phone number
value: 'info@airporttransfer.com',  // Your email
```

**File**: `src/lib/submit.ts`
```typescript
// Update WhatsApp number:
const phoneNumber = '905364291221';  // Your WhatsApp number
```

### 2. Adjust Pricing

**File**: `src/lib/pricing.ts`
```typescript
const VEHICLE_BASE_RATES = {
  sedan: 50,     // Change base prices
  minivan: 80,
  minibus: 120
};
```

### 3. Change Company Name

**Files to update**:
- `src/components/Navbar.tsx` - Line with "GetTransfer Istanbul"
- `src/components/Footer.tsx` - Company name and description
- `index.html` - Page title

### 4. Update Sample Routes

**File**: `src/sections/Pricing.tsx`
```typescript
const routes = [
  { route: 'Your Airport → Your City', vehicle: t.form.sedan, price: 70 },
  // Add your routes...
];
```

## Common Tasks

### Adding a New Language

1. Copy `src/i18n/en.ts` to `src/i18n/XX.ts` (XX = language code)
2. Translate all strings
3. Add to `src/i18n/index.ts`:
   ```typescript
   import XX from './XX';

   export type Language = 'tr' | 'en' | 'de' | 'fr' | 'it' | 'XX';

   export const languages = {
     // ... existing
     XX: { name: 'Language Name', flag: '🏁' }
   };

   export const translations = {
     // ... existing
     XX
   };
   ```

### Connecting to a Backend

**Option 1: REST API**
```typescript
// src/lib/submit.ts
export async function submitReservation(data: BookingData) {
  const response = await fetch('https://your-api.com/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

**Option 2: Supabase** (Already Installed!)
```typescript
// 1. Create .env.local
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

// 2. Update src/lib/submit.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function submitReservation(data: BookingData) {
  const { error } = await supabase.from('bookings').insert([data]);
  if (error) throw error;
  return { success: true };
}
```

### Changing the Color Scheme

The site uses blue as the primary color. To change it:

1. Find & replace in all files:
   - `blue-50` → `green-50` (or your color)
   - `blue-100` → `green-100`
   - `blue-600` → `green-600`
   - `blue-700` → `green-700`

2. Common files to check:
   - `src/sections/Hero.tsx`
   - `src/sections/ReservationForm.tsx`
   - `src/components/Navbar.tsx`
   - `src/sections/WhyUs.tsx`

### Enabling Online Payments

The site is designed for **cash-only, office payment**. To add online payments:

1. **Remove cash-only badges**:
   - Delete `<Badge />` components from Hero, ReservationForm, FAQ
   - Remove `cashOnly` text from translations

2. **Add payment gateway**:
   ```bash
   npm install @stripe/stripe-js
   ```

3. **Update booking flow**:
   - Add payment step after form submission
   - Process payment before WhatsApp confirmation
   - Store payment status in backend

## Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy the 'dist' folder to:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod
# - Any static host
```

## Troubleshooting

**Issue**: Language not switching
- **Fix**: Check browser console for errors
- Verify translation file is imported in `src/i18n/index.ts`

**Issue**: Build fails
- **Fix**: Run `npm run typecheck` to find TypeScript errors
- Run `npm run lint` to find code issues

**Issue**: WhatsApp link not working
- **Fix**: Verify phone number format in `src/lib/submit.ts`
- Format should be: `905364291221` (country code + number, no +)

## Need Help?

1. Check `README.md` for detailed documentation
2. Inspect browser console for errors
3. Use React DevTools to debug component state

## Pro Tips

- Use Chrome DevTools Device Mode to test mobile layouts
- Test all language switches to ensure completeness
- Add real routes and prices from your service area
- Update the company address in Contact section
- Test the WhatsApp flow end-to-end

Happy coding!
