# Format Finder - Golf Formats Discovery App

A beautifully designed web application for discovering and exploring different golf formats, featuring a Masters Tournament-inspired UI with elegant animations and intuitive filtering.

## 🏌️ Features

- **20+ Golf Formats**: Comprehensive collection of tournament, team, betting, and casual formats
- **Smart Filtering**: Filter by category, skill level, player count, difficulty, and duration
- **Masters-Inspired Design**: Clean, professional aesthetic with green and tan color palette
- **Interactive UI Elements**: Dynamic category selection, animated statistics, hover previews
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Quickly find formats that match your needs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cmurphy1140/format-finder.git
cd "Format Finder"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Masters theme
- **State Management**: Zustand
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React (SVG icons only)
- **Animations**: CSS animations and transitions

## 📁 Project Structure

```
format-finder/
├── app/                    # Next.js app directory
│   ├── formats/           # Formats listing page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── formats/          # Format-specific components
│   └── layout/           # Layout components
├── data/                  # Golf format data
├── src/                   # Source utilities
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   └── store/            # Zustand store
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Color Palette (Masters Theme)
- **Pine**: Primary green (#004B36)
- **Fairway**: Medium green (#006747)
- **Charcoal**: Dark text (#2C312E)
- **Slate**: Body text (#4A5247)
- **Sand**: Background tan (#F5F2ED)
- **Gold**: Accent (#D4A574)
- **Cream**: Light background (#FDFDF8)

### Key UI Patterns
- Glass morphism effects with backdrop blur
- Subtle animations (300ms transitions)
- 2px green borders on interactive elements
- Rounded corners (8-16px)
- Consistent shadows and hover states

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler check
```

## 📝 Format Categories

- **Tournament**: Official competitive formats (Stroke Play, Match Play, Stableford)
- **Team**: Group formats (Scramble, Best Ball, Alternate Shot)
- **Betting**: Wagering games (Skins, Nassau, Wolf)
- **Casual**: Fun recreational formats (Bingo Bango Bongo, String Game)

## 🌟 Key Features

### Dynamic Category Filtering
Interactive pill buttons allow quick filtering by format category with smooth animations.

### Hover-to-Preview
Format cards reveal quick rules on hover, providing instant information without navigation.

### Animated Statistics
Homepage statistics count up dynamically for engaging visual feedback.

### Responsive Filtering
Comprehensive filter panel with real-time result counts and smart category organization.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by the Masters Tournament aesthetic
- Golf format information compiled from various golf resources
- Built with Next.js and the React ecosystem

---

**Live Demo**: [Coming Soon]  
**Repository**: [github.com/cmurphy1140/format-finder](https://github.com/cmurphy1140/format-finder)
