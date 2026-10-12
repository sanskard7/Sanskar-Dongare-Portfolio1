# Sanskar Dongare — IT Student Portfolio

A responsive, animated portfolio built with HTML5, CSS3, and vanilla JavaScript. The visual direction is inspired by the supplied reference screenshots: a cinematic dark background, purple/cyan gradients, glowing cards, a floating section dock, and interactive cursor effects.

## Files

- `index.html` — all portfolio sections and editable content
- `css/style.css` — responsive design, ambient background, motion, cursor styling, cards and layout
- `js/script.js` — mobile navigation, active dock, scroll reveals, cursor tracking, 3D card tilt, project dialogs and contact mailto fallback
- `assets/icons/favicon.svg` — favicon

## Preview locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or open the folder in VS Code and use Live Server.
3. Test desktop and mobile layouts. The custom cursor and card tilt work only with a mouse/trackpad; they are disabled for touch screens and reduced-motion preferences.

## Personalize before publishing

Open `index.html` and update:

- GitHub and LinkedIn URLs (currently placeholders)
- College/university and graduation details, when you want to show them
- Resume link/file if you add a real PDF
- Project repository/demo links only when those URLs exist and work
- Project status and descriptions to reflect the work actually completed

The current site deliberately avoids invented internships, certifications, academic grades, project URLs, or achievement statistics.

## Contact form

The contact form validates its fields and opens the visitor's default email application with a prepared message addressed to `sanskardongare7@gmail.com`. It does not send messages automatically. To submit from the website itself, connect a real backend or a form service and update the form handler accordingly.

## Deploy to GitHub Pages

1. Extract the ZIP.
2. Upload the contents of the extracted folder to the root of your existing repository (preserve `css/`, `js/`, and `assets/`).
3. Commit the changes.
4. In GitHub, open **Settings → Pages** and choose the correct branch and root folder if Pages is not already configured.
5. Open the published URL and test every section, link, and the contact fallback on desktop and mobile.

## Accessibility and performance

- Semantic sections, visible focus outlines, skip link and labelled form fields
- Responsive layouts and mobile navigation
- `prefers-reduced-motion` support
- No frameworks or third-party JavaScript dependencies
- Cursor effects are decorative and disabled on touch/reduced-motion devices
