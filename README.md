# QReat - QR Code Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

QReat is a modern web application for easily creating custom QR codes. Generate, customize, and download QR codes for various purposes with an intuitive interface and comprehensive features.

<div align="center">
  <img src="/public/project/BRAND.png" alt="QReat Dashboard" width="80%" style="border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
</div>

## Features

- Multiple pre-designed QR code templates
- Customize colors and QR code styles
- Add logo to QR codes
- Download in PNG and SVG formats
- Light/dark mode
- Responsive design
- Smooth animations
- Real-time preview

## Screenshots

<div align="center">
  <img src="/public/project/GENERATE.png" alt="Template Selection" width="45%" style="border-radius: 8px; margin: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
  <img src="/public/project/FEATURED.png" alt="Customization" width="45%" style="border-radius: 8px; margin: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
  <img src="/public/project/HOW.png" alt="Preview" width="45%" style="border-radius: 8px; margin: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
  <img src="/public/project/CONTACT.png" alt="Download" width="45%" style="border-radius: 8px; margin: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
</div>

## Technologies Used

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **QR Generation**: qrcode.react

## Project Structure

```
qreat/
├── app/                    # Next.js pages
│   ├── api/               # API routes
│   └── page.tsx           # Main page
│
├── components/            # UI components
│   ├── qr-generator.tsx   # Main QR generator component
│   ├── ui/                # Shadcn/ui components
│   └── theme/             # Theme and theme settings
│
├── lib/                   # Utility functions
│   ├── qr-utils.ts        # QR helper functions
│   └── utils.ts           # General utility functions
│
├── public/                # Static assets
│   └── project/           # Project screenshots
│
├── styles/                # Global styles
│   └── globals.css        # Global CSS variables
│
├── types/                 # TypeScript types
│   └── qr.types.ts        # QR code type definitions
│
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or newer
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RacoonHQ/qreat-qr-generator.git
   cd qreat-qr-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
npm test
# or
pnpm test
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please open an issue on GitHub.

## Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [qrcode.react](https://www.npmjs.com/package/qrcode.react) - QR code generation

## Deployment

You can easily deploy this project to:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/docs)

## Acknowledgments

- Built with Next.js 14
- Styled with Tailwind CSS
- Supports SSR and SSG
- 100% Responsive
- Type-safe with TypeScript

## Developer

Made by [RacoonHQ](https://github.com/racoonhq)
