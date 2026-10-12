# Sanskar Dongare — Personal Portfolio

A responsive, futuristic personal portfolio built with **HTML5, CSS3, and vanilla JavaScript**. It has no framework or build step and can be hosted as a static website.

## 1. Project structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   │   └── favicon.svg
│   └── resume.pdf   # Add your genuine resume here
└── README.md
```

## 2. Run locally

1. Download and extract the project folder.
2. Open `portfolio/index.html` in a modern browser.
3. For a more realistic local-server test, open the folder in VS Code and use a local static server extension, or run `python -m http.server 8000` from the `portfolio` directory and visit `http://localhost:8000`.
4. Test desktop and mobile widths, navigation, theme toggle, project details, and contact-form validation.

The site has no external library dependencies. Some browser settings may restrict certain features when opened directly from a file; a local server avoids most of those restrictions.

## 3. Edit your details

Open `js/script.js` and edit the `portfolioConfig` object near the top:

- `email`: your contact email.
- `github`: full URL to your GitHub profile.
- `linkedin`: full URL to your LinkedIn profile.
- `resumePath`: path to your real resume PDF.
- `education.institution`: your college/university name.
- `education.graduationYear`: expected graduation year.
- `credentials`: add only real certifications or achievements, with a title and issuer.
- `projects`: add repository/demo URLs and update each project status only after verifying it.

Use full `https://` URLs for external profiles, repositories, and demos. If a URL is blank or invalid, the corresponding link remains disabled instead of pointing to a fake destination.

### Resume

Put your real PDF at `assets/resume.pdf`. The included site links to that path, but this project does not contain a fabricated resume. If you do not want to publish a resume yet, remove the resume button from `index.html`.

### Projects and status

The three starter cards are:
1. Student Examination Marks Prediction
2. Financial Calculator Website
3. Cybersecurity & Networking Labs (an educational lab collection, not necessarily a standalone software product)

Update project descriptions and technologies to match what you have actually implemented. Do not list a feature as completed until you have tested it. Add project screenshots under `assets/images/` only when you have genuine screenshots, and include descriptive `alt` text if you add them to the page.

## 4. Contact form behavior

The form validates the four fields in the browser and opens the visitor's default email application using a `mailto:` link. **It does not send mail by itself and does not use a backend.** The visitor must review and send the message in their email application.

For a hosted form, connect a form provider or your own backend, update the form submission code in `js/script.js`, and review spam prevention and privacy requirements. Never put API keys or secrets in client-side JavaScript.

## 5. GitHub upload

1. Create a new repository on GitHub, for example `personal-portfolio`.
2. Keep the repository public if you want to use GitHub Pages without additional access configuration.
3. Upload the contents of the `portfolio` folder (the files inside it, not a second nested `portfolio/portfolio` folder).
4. Alternatively, run these commands from the project directory after installing Git:

   ```bash
   git init
   git add .
   git commit -m "Build personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/personal-portfolio.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` and the repository name with your actual values.

## 6. Deploy with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under build and deployment, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. GitHub will show the published URL in the Pages settings.
6. Open that URL and test every section. If the repository is a project site, the URL typically includes the repository name.

This project uses relative asset paths and is suitable for a root-level GitHub Pages deployment.

## 7. Test on your phone

1. Deploy the website, then open its published HTTPS URL on your phone.
2. Test the mobile menu, all section links, text wrapping, theme toggle, project details dialog, and form validation.
3. Confirm external profile/repository links open the intended pages.
4. Confirm the resume link works only after you upload your actual PDF.
5. Test with reduced motion enabled in your device/browser accessibility settings.
6. Check that all text remains readable at narrow widths and that there is no horizontal scrolling.

## 8. Pre-publish checklist

- [ ] Replace the profile and repository placeholders with genuine URLs.
- [ ] Add your real resume PDF or remove the resume button.
- [ ] Add college and graduation details only when confirmed.
- [ ] Review project status, features, and technology tags for accuracy.
- [ ] Add genuine credentials only; leave the section hidden otherwise.
- [ ] Verify the email address.
- [ ] Test the contact `mailto:` flow on a device with an email app configured.
- [ ] Test keyboard navigation and reduced-motion behavior.
- [ ] Check the deployed site on both desktop and mobile.

## Customization notes

- Colors, spacing, typography, borders, and animation durations are CSS custom properties at the top of `css/style.css`.
- Content is primarily in `index.html`; links, status, education details, and credentials are configured in `js/script.js`.
- The website avoids invented work experience, scores, credentials, and achievement statistics.
