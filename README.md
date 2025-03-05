# Arcade-Themed Portfolio

A retro arcade-themed portfolio website built with Next.js, featuring a dark/light mode toggle, CRT effects, and responsive design.

![Arcade Portfolio](https://github.com/leny62/personal-arcade-portfolio/raw/main/public/preview.png)

## ✨ Features

- **Retro Arcade UI**: Neon colors, pixel fonts, and CRT effects
- **Dark/Light Mode**: Toggle between dark (arcade) and light modes
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Powered by Framer Motion
- **Accessibility**: WCAG compliant with keyboard navigation
- **SEO Optimized**: Built-in metadata configuration
- **TypeScript**: Type-safe codebase

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-arcade-portfolio.git
   cd personal-arcade-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add any other environment variables here
```

## 🏗️ Project Structure

```
personal-arcade-portfolio/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── ui/             # UI components (ThemeToggle, etc.)
│   │   └── ...
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets
└── ...
```

## 🎮 Customization

### Theme Colors

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  /* Dark mode (default) */
  --neon-pink: #ff00ff;
  --neon-blue: #00ffff;
  /* Add or modify colors here */
}
```

### Adding Pages

Create new pages in the `app` directory following the Next.js App Router convention:

```
app/
├── about/
│   └── page.tsx            # /about route
├── projects/
│   └── page.tsx            # /projects route
```

## 🧪 Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will detect Next.js and set up the build configuration automatically

### Other Platforms

For other platforms, build the project first:

```bash
npm run build
# or
yarn build
```

Then deploy the generated `.next` folder according to your platform's instructions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm run lint && npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Style Guidelines

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Document new components and functions
- Ensure accessibility (WCAG compliance)

### Using This Project as a Template

If you want to use this project as a template for your own portfolio:

1. Fork the repository
2. Update personal information in:
   - `app/layout.tsx` (metadata)
   - Content files for your projects, experience, etc.
3. Replace images in the `public` directory
4. Customize colors in `app/globals.css`
5. Deploy your version

Please provide attribution by keeping a link to the original project in your footer.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

---

Built with ❤️ by [Leny Pascal IHIRWE](https://github.com/leny62/)
