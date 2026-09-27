**Virexo Innovations Agency Website**

**1. Project Overview**
Virexo Innovations is a modern, high-performance, responsive single-page web application designed for a digital growth and tech agency. The website serves as a client-facing platform to present services, display client testimonials, showcase key agency metrics, and collect inquiries seamlessly.

Brand Name: Virexo Innovations

Tagline: Where Innovation Meets Excellence

Core Purpose: To provide an engaging digital presence for Virexo, highlighting web development, AI automation, backend systems, UI/UX design, and digital growth services while capturing leads via integrated forms.

**2. Key Features & Functionalities**
Dark & Light Mode Toggle: Supports dynamic theme switching with persistent state saved in localStorage, allowing users to seamlessly transition between dark and light modes.

Animated Statistics Counter: Uses JavaScript scroll listeners to trigger animated counting for delivered projects, active clients, and customer satisfaction rates when the stats section comes into view.

Live Service Search & Category Filter: Enables users to filter services dynamically using keywords (e.g., React, Python, AI, Design) or through categorical tab buttons (All, Dev, AI, Design, Growth).

Interactive Service Details Modal: Clicking on any service card opens a pop-up modal detailing technology stacks, project deliverables, and a step-by-step service delivery roadmap.

Integrated Lead Generation (EmailJS): Contact forms and modal submission forms connect directly to the EmailJS API to route client inquiries directly without requiring a dedicated backend server.

Interactive FAQ Accordion: Provides collapsible answers to common questions for an efficient, space-saving user experience.

Responsive Navigation & UI Polish: Fully responsive navigation bar with mobile drawer toggle, smooth section scrolling, and a floating "Back to Top" button.

**3. Technology Stack**
Structure (HTML5): Semantic markup featuring SEO meta tags, Open Graph meta tags, and structured sections for accessibility.

Styling (CSS3): Custom CSS architecture using CSS variables (--bg-primary, --accent-primary), Flexbox, CSS Grid layouts, and custom animation keyframes.

Interactivity (Vanilla JavaScript ES6+): Lightweight client-side script handling DOM manipulation, event delegation, search filters, modal state management, and scroll triggers without heavy external framework dependencies.

Third-Party Services & Libraries:

EmailJS SDK: Asynchronous form handling (@emailjs/browser).

Font Awesome (v6.5.1): Vector icon set.

Google Fonts: Custom typography featuring Sora for headings and Inter for body text.

**4. File Structure & AssetsPlaintext**
virexo-innovations/
│
├── index.html        # Main HTML structure and content markup
├── style.css         # Main stylesheet, CSS variables, and layout rules
├── script.js        # Core logic, theme toggle, filters, modals, & EmailJS integration
├── logo.jpg          # Brand identity logo asset
└── AI.jpg            # Visual media asset for AI service showcase
**5. Setup & Execution GuideLocal Development**
Clone or extract all project files into a single folder (index.html, style.css, script.js, logo.jpg, AI.jpg).

Open index.html directly in any standard browser (Chrome, Edge, Firefox, Safari).

Alternatively, launch the project using an extension such as Live Server in Visual Studio Code for real-time development reloading.
