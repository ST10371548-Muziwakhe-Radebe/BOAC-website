# BOAC React Rebuild — Development Log

## 24 September 2026

### Objective

Recreate the existing multi-page BOAC HTML/CSS/JavaScript website as a maintainable React application and document the work, decisions, challenges, errors and alternative approaches.

### Work completed

1. Audited the original repository and identified nine pages: Home, About, Programmes, Youth Development, Media, Get Involved, Volunteer, Donate and Contact.
2. Inventoried the shared stylesheet, JavaScript behaviours and seven local image assets.
3. Extracted and reviewed headings, descriptions, calls to action, organisational details, programme copy, media entries, form fields and footer content before editing.
4. Created a Vite + React scaffold with React 18-compatible entry-point structure, development, build, preview and lint commands.
5. Replaced the static landing document with a semantic React mount document, metadata, favicon and font loading.
6. Created reusable `Navbar`, `Footer`, `PageHero`, `SectionTitle`, `Card`, `CTA`, `Field` and `FormStatus` components.
7. Consolidated duplicated navigation and footer markup into shared components.
8. Implemented lightweight History API routing for all nine clean routes, browser back/forward support, scroll-to-top behaviour and route-specific document titles.
9. Rebuilt every page as a React component while retaining the original BOAC message, programme structure, imagery, colours and typography.
10. Reimplemented the responsive hamburger menu with React state.
11. Reimplemented media category filtering with React state.
12. Added copy-to-clipboard interaction and visible feedback to the bank-detail rows.
13. Rebuilt volunteer and contact forms with labelled controls, required-field validation, accessible status feedback and demonstration-only submission behaviour.
14. Retained the original CSS design system and added a small React-specific layer for clean-route pages, layout refinements, clipboard rows, feedback states and reduced-motion accessibility.
15. Removed the superseded individual HTML documents and imperative `js/main.js`; their full history remains recoverable through Git.
16. Rewrote the README with setup, routing, architecture, interaction and deployment documentation.
17. Added the missing dedicated Gallery route with a responsive masonry-style grid, meaningful captions, keyboard-focus styling, previous/next controls, backdrop close and Escape-to-close behaviour.
18. Added the Gallery to desktop/mobile navigation and footer links.
19. Added a keyboard-accessible “Skip to main content” link and explicit main-content focus target.
20. Moved the desktop navigation breakpoint to 1120px so the expanded eight-link navigation cannot crowd or overlap at tablet/small-laptop widths.

### Design and engineering decisions

- **No routing dependency:** The site is small, so a minimal History API router avoids adding React Router solely for nine static routes. React Router remains a suitable future option if nested routes, loaders, authentication or complex navigation are added.
- **Preserve the design system:** Reusing `css/styles.css` reduces visual drift and migration risk. `src/react.css` is intentionally an additive layer rather than a full redesign.
- **Reusable page shell:** Navigation, footer and common content patterns now have one source of truth.
- **Local imagery:** Existing BOAC images remain local, avoiding new licensing or remote-availability risks.
- **Progressive form behaviour:** Forms demonstrate validation and UI feedback without pretending data has reached a real server.
- **Clean URLs:** The app uses `/about` instead of `about.html`. Hosting must provide a single-page-app fallback to `index.html`.
- **Accessibility:** Added explicit labels, button semantics, ARIA state for the mobile menu, live status messages, descriptive image text and reduced-motion support.

### Challenges and errors

1. **Windows sandbox startup failure** — Initial file scans failed with `windows sandbox failed: helper_unknown_error: setup refresh had errors`. Read-only inspection was retried through the approved outside-sandbox command path.
2. **Patch writer affected by the same failure** — The normal patch writer could not access the workspace. The standard Codex patch executable was located and used outside the failed sandbox; changes were still applied as explicit patches.
3. **Oversized first patch** — The first combined React conversion patch was too large and failed before writing. The solution was to split it into focused patches: scaffold, shared components, page groups, app/styles, and documentation.
4. **Patch wrapper newline handling** — The batch wrapper reported that the final patch line was invalid even though the patch text was correct. Calling the underlying standard patch executable directly with trimmed trailing newlines resolved it.
5. **Initial lint failure** — The hooks lint rule correctly identified a synchronous state update in a route-change effect. Mobile-menu closing was moved directly onto mobile link actions, avoiding the extra render. A Fast Refresh warning for the shared component/constant module was scoped out because it does not affect runtime correctness.

### Alternatives considered

- **Keep one HTML file per route and mount small React widgets:** rejected because it would retain duplicated layout and would not be a genuine React rebuild.
- **Inject the old HTML with `dangerouslySetInnerHTML`:** rejected because it would weaken component reuse, safety and maintainability.
- **Use React Router:** valid, but unnecessary for the current route count and static requirements; the built-in History API provides the required behaviour with fewer dependencies.
- **Rewrite all CSS:** possible, but likely to introduce visual regressions. Layering small additions on the established design system is safer.
- **Submit forms to email or a third party:** not implemented because no approved backend, privacy policy or service credentials were supplied.

### Follow-up required before production

- Confirm the phone number, email address, bank account details, registration statement and all dates with BOAC.
- Connect forms to an approved secure backend, add spam protection and publish a privacy notice.
- Configure the host to serve `index.html` for clean route requests.
- Replace placeholder social links with official profiles.
- Add real media-detail destinations where available.
- Run an accessibility audit and test on representative physical mobile devices before launch.

### Verification record

- `npm install`: passed; 140 packages installed, 0 reported vulnerabilities.
- `npm run lint`: passed with 0 errors and 0 warnings after the mobile-menu state fix.
- `npm run build`: passed; Vite transformed 21 modules and produced the production bundle successfully.
- HTTP smoke test: passed for `/`, `/about`, `/programmes`, `/youth`, `/media`, `/gallery`, `/get-involved`, `/volunteer`, `/donate`, `/contact` and the not-found fallback. Each returned HTTP 200 with the React mount present.
- Gallery asset test: passed; all six gallery images and the BOAC logo returned HTTP 200.
- Final regression pass after Gallery implementation: `npm run lint` passed with 0 errors/warnings and `npm run build` passed with 22 transformed modules.
- Automated visual and interaction test: **not completed in this session**. The in-app browser process could not start because the environment repeated the Windows sandbox `helper_unknown_error: setup refresh had errors` failure. This is an environment limitation, not a detected website error. Manual visual checking with `npm run dev` is still recommended.
