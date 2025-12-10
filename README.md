# IAM On Demand - Jekyll Website

A Jekyll-based marketing website for IAM On Demand, featuring shadcn/ui-inspired design, Formspree contact forms, and support for blog and documentation sections.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** (version 3.0 or higher)
- **Bundler** (Ruby gem manager)
- **Git** (for version control)

#### Installing Prerequisites

**macOS:**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby
brew install ruby

# Add Ruby to PATH (add to ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install Bundler
gem install bundler
```

**Windows:**
```bash
# Download and install Ruby+Devkit from https://rubyinstaller.org/
# Then install Bundler
gem install bundler
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ruby-full build-essential
gem install bundler
```

### Step-by-Step Local Setup

1. **Clone or download this repository**
   ```bash
   cd iam-ondemand-jekyll
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open your browser**
   Navigate to: [http://localhost:4000](http://localhost:4000)

The `--livereload` flag automatically refreshes your browser when you make changes.

### Alternative: Build for Production

To generate the static site without serving:

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

---

## 📁 Project Structure

```
iam-ondemand-jekyll/
├── _config.yml              # Main Jekyll configuration
├── Gemfile                  # Ruby dependencies
├── index.html               # Landing page (StoryBrand sections)
├── robots.txt               # Search engine instructions
│
├── _layouts/                # Page templates
│   ├── default.html         # Base layout with header/footer
│   ├── landing.html         # Landing page layout
│   ├── post.html            # Blog post layout
│   └── wiki.html            # Documentation page layout
│
├── _includes/               # Reusable HTML components
│   ├── head.html            # <head> content, SEO, analytics
│   ├── header.html          # Navigation header
│   ├── footer.html          # Site footer
│   └── components/
│       └── contact-form.html # Lead capture form (Formspree)
│
├── _sass/                   # SCSS stylesheets
│   ├── _variables.scss      # shadcn/ui design tokens
│   ├── _base.scss           # Reset and typography
│   ├── _components.scss     # Buttons, forms, cards
│   └── _layout.scss         # Page section styles
│
├── _data/                   # Data files (YAML)
│   ├── navigation.yml       # Nav menu structure
│   └── pricing.yml          # Pricing tier data
│
├── _posts/                  # Blog posts (Markdown)
│   └── 2025-01-15-example.md
│
├── _wiki/                   # Documentation pages (Markdown)
│   └── quick-start.md
│
├── assets/
│   ├── css/main.scss        # Main stylesheet entry
│   ├── js/main.js           # JavaScript (menus, themes)
│   └── images/
│       └── sitegraphics/    # Your image assets
│
├── blog/
│   └── index.html           # Blog listing page
│
├── pages/
│   └── docs.html            # Documentation index
│
└── .github/
    └── workflows/
        └── jekyll.yml       # GitHub Actions deployment
```

---

## ⚙️ Configuration

### Essential Settings (`_config.yml`)

Update these values for your site:

```yaml
title: "IAM On Demand"
description: "Your site description for SEO"
url: "https://iam-ondemand.com"  # Your production domain
google_analytics: G-XXXXXXXXXX   # Your GA4 ID
formspree_form_id: "xxxxxxxx"    # Your Formspree form ID
```

### Setting Up Formspree

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID (looks like `xyzabcde`)
4. Update `_config.yml`:
   ```yaml
   formspree_form_id: "xyzabcde"
   ```

### Adding Your Images

Copy your existing images to `assets/images/sitegraphics/`:

```bash
# From your original site
cp -r sitegraphics/* assets/images/sitegraphics/
```

Required images (referenced in the code):
- `logo.png` - Site logo
- `hero-image.png` - Hero section image
- `stakes_notext.png` - Problem section image
- `explanatory_image.png` - Explanatory section image
- `server-hosting-svgrepo-com.svg` - Service icon
- `compliance-svgrepo-com.svg` - Service icon
- `automation-marketing-launch-rocket-laptop-svgrepo-com.svg` - Service icon
- `plan_article-blog-blogging.svg` - Step 1 icon
- `plan_coding-gear-options.svg` - Step 2 icon
- `plan_smartphone-mobile-phone.svg` - Step 3 icon
- `logoipsum-*.svg` - Client/partner logos

---

## ✍️ Adding Content

### Blog Posts

Create a new file in `_posts/` with the naming format:
```
YYYY-MM-DD-title-slug.md
```

Example front matter:
```yaml
---
layout: post
title: "Your Blog Post Title"
date: 2025-01-20
author: "Author Name"
description: "Brief description for SEO"
tags: [keycloak, security, tutorial]
reading_time: 5
---

Your content here in Markdown...
```

### Documentation Pages

Create a new file in `_wiki/`:

```yaml
---
title: "Page Title"
description: "Brief description"
order: 2  # Controls sidebar order
last_modified_at: 2025-01-20
---

Your documentation content...
```

### Navigation

Edit `_data/navigation.yml` to update menu items:

```yaml
main:
  - title: "About"
    url: "/about/"
  - title: "Blog"
    url: "/blog/"
  # Add more items...
```

---

## 🎨 Customization

### Colors (Dark/Light Mode)

Edit `_sass/_variables.scss` to change the color scheme. The design uses CSS custom properties:

```scss
:root {
  --primary: 0 0% 9%;           // Primary button color
  --background: 0 0% 100%;      // Page background
  --foreground: 0 0% 3.9%;      // Text color
  // ... more colors
}

.dark {
  --background: 240 10% 3.9%;   // Dark mode background
  --foreground: 0 0% 98%;       // Dark mode text
  // ... more dark mode colors
}
```

### Typography

Also in `_sass/_variables.scss`:

```scss
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
--text-base: 1rem;
--text-lg: 1.125rem;
// ... more sizes
```

### Pricing

Edit `_data/pricing.yml` to update pricing tiers without touching HTML.

---

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Create a GitHub repository** for your site

2. **Push your code**
   ```bash
   git init
   git add .
   git commit -m "Initial Jekyll site"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"
   - The workflow file (`.github/workflows/jekyll.yml`) handles the rest

4. **Custom Domain (Optional)**
   - In Settings → Pages, add your custom domain
   - Create a `CNAME` file in the root with your domain:
     ```
     iam-ondemand.com
     ```
   - Update DNS records with your domain provider

### Alternative: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`

### Alternative: Manual Deployment

```bash
# Build the site
JEKYLL_ENV=production bundle exec jekyll build

# Upload _site/ contents to your web server
```

---

## 🔧 Troubleshooting

### Common Issues

**"Could not find gem" error**
```bash
bundle install
```

**"Permission denied" on macOS/Linux**
```bash
bundle exec jekyll serve
# NOT: jekyll serve
```

**Port 4000 already in use**
```bash
bundle exec jekyll serve --port 4001
```

**CSS not loading**
- Check that `_config.yml` has correct `url` and `baseurl`
- For local development, `baseurl` should be empty: `baseurl: ""`

**Livereload not working**
- Try stopping and restarting the server
- Clear browser cache
- Check firewall settings

### Getting Help

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Formspree Documentation](https://formspree.io/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## 📋 Checklist Before Launch

- [ ] Update `_config.yml` with your domain and details
- [ ] Replace placeholder images in `assets/images/`
- [ ] Set up Formspree and add your form ID
- [ ] Test the contact form submission
- [ ] Add your Google Analytics ID
- [ ] Create at least one blog post
- [ ] Create essential documentation pages
- [ ] Test on mobile devices
- [ ] Verify dark mode works correctly
- [ ] Check all navigation links
- [ ] Run Lighthouse audit for performance/accessibility
- [ ] Set up custom domain DNS
- [ ] Enable HTTPS

---

## 📄 License

[Add your license here]

---

## 🤝 Contributing

[Add contribution guidelines if open source]
