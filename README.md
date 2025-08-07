# Development Plan

🔍 1. Learning Goals: 

🧠 TypeScript (Refresh)
Use type-safe components and props
Define interfaces for data entries
Use enums for pain levels


📦 Redux (Deepen)
Use createSlice, configureStore
Local state → Redux (entries, filters)
Optionally: persist with redux-persist


♿ Accessibility
Use semantic HTML
Add keyboard navigation
Use ARIA roles for custom components
Test with screen readers (VoiceOver, NVDA)

Helpful libraries:
react-aria
axe-core (for accessibility audits)


📅 Calendar Integration
Use something like:
react-big-calendar (well-supported)
Or fullcalendar
Need to connect it to the state and events.


📱 PWA Basics
Add manifest.json
Register a service worker (e.g. via vite-plugin-pwa)
Enable offline caching
Add install banner prompt
Install PWA tooling:
npm install vite-plugin-pwa


📁 2. Minimal Viable Features (MVP)

Feature	Description
Add entry	Date, duration, pain level, notes
Calendar view	Visualize migraine days
Summary	Stats (avg per month, etc.)
PWA	Installable, offline-capable
Accessibility	Keyboard nav, ARIA roles, proper contrast, etc.

✅ 3. Optional but Fun
Charts with Recharts or Chart.js
Reminders (with notifications API)
Export data (CSV or PDF)


## Auth and Data store management:
🔥 Firebase Features:
Auth - Sign up/sign in with email & password 
Redux state management for users 
Firestore - Store migraine logs per user
Firebase - Hosting deploy as PWA


🚀  Firebase Hosting + PWA

npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
🔄 Folder Structure Suggestion

src/

├── components/

├── pages/

├── store/

│   └── migraineSlice.ts

├── firebase.ts

├── hooks/

├── types/

├── App.tsx


Auth (sign in/out, session)	
Firestore per-user data	
Sync Redux with Firestore	
Protected routes	
Firebase hosting 

