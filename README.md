# Bokwidi Old Age Centre — React Website

This repository contains the React rebuild of the Bokwidi Old Age Centre (BOAC) website. It preserves the original organisation content, visual identity and image assets while replacing nine duplicated HTML documents and the imperative JavaScript file with reusable React components.

## Run the project

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. For a production check:

```bash
npm run build
npm run preview
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Home, impact figures and programme overview |
| `/about` | History, mission, vision and principles |
| `/programmes` | Elder care, youth and education programmes |
| `/youth` | Youth Development details |
| `/media` | Filterable radio, TV, event and press stories |
| `/gallery` | Responsive photo gallery with an accessible image viewer |
| `/get-involved` | Volunteering, partnerships and resource donations |
| `/volunteer` | Interactive volunteer application form |
| `/donate` | Impact explanation and copyable bank details |
| `/contact` | Contact details and enquiry form |

## Architecture

- `src/App.jsx` owns lightweight client-side routing, page titles and the shared page shell.
- `src/components.jsx` contains reusable navigation, footer, hero, cards, forms and calls to action.
- `src/pages/` groups the nine page components by purpose.
- `css/styles.css` is the original BOAC design system, retained to preserve visual continuity.
- `src/react.css` adds React-specific refinements, responsive rules, form feedback and reduced-motion support.
- `assets/images/` contains the original local BOAC imagery and logo.
- `DEVELOPMENT_LOG.md` is the dated, detailed record of the conversion, decisions, errors, alternatives and verification.

## User interactions

- Responsive hamburger navigation controlled by React state.
- Media filter buttons update cards without reloading.
- Gallery cards open an accessible image viewer with previous/next controls and Escape-to-close support.
- Bank-detail rows copy values to the clipboard and show feedback.
- Volunteer and contact forms use browser validation, clear after successful demonstration submission and show an accessible status message.
- Clean URLs use the History API; production hosting must redirect unknown routes to `index.html`.

## Important deployment note

The forms are front-end demonstrations and do not send personal information to a server. Connect them to an approved backend or form service before production. The bank and contact details are inherited placeholders and must be verified by BOAC before publication.

## Attribution

- React and React DOM: Meta Platforms, Inc., React documentation.
- Vite: Vite project documentation.
- Web platform APIs and semantic HTML patterns: Mozilla Developer Network and W3C.
- Inter and Lora fonts: Google Fonts.

The repository history preserves the earlier static HTML implementation.
