# meshub Beta - Next.js Application

This is a Next.js application that builds to static files for GitHub Pages.

## Development

First, ensure you're using the correct Node.js version:

```bash
nvm use
```

Then install dependencies and start the development server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000/index-beta to see the React app.

## Building for GitHub Pages

```bash
npm run build
```

This will:
1. Build the Next.js app to the `out` directory
2. Copy the necessary files to `docs/` for GitHub Pages
3. Preserve existing files in `docs/` (like index.html, CNAME, images)

## Cleanup

To remove build artifacts and cache:

```bash
npm run clean
```

This removes the `.next` cache directory and `out` build directory.

## Project Structure

- `src/pages/index-beta.tsx` - The React component for /index-beta
- `src/pages/_app.tsx` - Next.js app wrapper
- `next.config.js` - Next.js configuration for static export
- `docs/` - GitHub Pages output directory

## Accessing the App

After pushing to GitHub:
- Main site: `https://[username].github.io/[repo]/`
- Beta app: `https://[username].github.io/[repo]/index-beta/`
