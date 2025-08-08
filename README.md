# ZeroEdgeStudios Website

A production-ready Next.js 14 website for ZeroEdgeStudios, a premium slot game studio. Built with TypeScript, TailwindCSS, and Framer Motion.

## Features

- 🎮 **Game Showcase**: Display and filter slot games with detailed information
- 📰 **News System**: Blog-style news with markdown content support
- 👥 **About Page**: Studio vision, milestones, and company information
- 💼 **Careers**: Job listings with application form
- 📞 **Contact**: Partnership inquiry form
- ⚖️ **Legal Pages**: Terms, Privacy, and Responsible Gaming
- 🎨 **Modern Design**: Dark, premium theme with neon accents
- 📱 **Responsive**: Mobile-first design with great desktop experience
- ⚡ **Performance**: Optimized for speed and SEO
- ♿ **Accessible**: Semantic HTML and ARIA labels

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Forms**: Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zeroedge-studios-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/            # Site layout and pages
│   ├── games/             # Game-related pages
│   ├── news/              # News pages
│   ├── about/             # About page
│   ├── careers/           # Careers page
│   ├── contact/           # Contact page
│   ├── legal/             # Legal pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── games/             # Game-specific components
├── data/                  # Static data files
│   ├── games.json         # Game data
│   ├── news.json          # News data
│   └── partners.json      # Partner data
└── lib/                   # Utility functions
    ├── data.ts            # Data access functions
    ├── analytics.ts       # Analytics utilities
    └── utils.ts           # General utilities
```

## Data Structure

### Games
Games are stored in `src/data/games.json` with the following structure:
```json
{
  "slug": "game-slug",
  "title": "Game Title",
  "tagline": "Game tagline",
  "thumb": "/images/games/game/thumb.jpg",
  "hero": "/images/games/game/hero.jpg",
  "status": "live|coming-soon",
  "mechanics": ["5x3", "10 Lines", "Free Spins"],
  "rtp_range": "95.5%–96.2%",
  "volatility": "High",
  "max_win": "10,000x",
  "features": ["Feature 1", "Feature 2"],
  "demo_url": "#",
  "presskit": "/presskits/game.zip"
}
```

### News
News posts are stored in `src/data/news.json`:
```json
{
  "slug": "post-slug",
  "title": "Post Title",
  "date": "2024-01-15",
  "excerpt": "Post excerpt",
  "cover": "/images/news/post.jpg",
  "contentHtml": "<p>Post content...</p>"
}
```

## Styling

The project uses TailwindCSS with custom colors and animations:

- **Background**: Dark theme (#0a0a0f to #0f0f18)
- **Accents**: Neon purple, red, and cyan
- **Typography**: Inter font family
- **Animations**: Framer Motion with custom easing

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## Environment Variables

Create a `.env.local` file for local development:

```env
# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to ZeroEdgeStudios.

## Support

For support, email hello@zeroedgestudios.com
