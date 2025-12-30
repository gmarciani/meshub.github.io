# MESHUB - Landing Page

<div align="center">
<img src="public/meshub-logo.png" alt="meshub-logo" width="200">
</div>

## Requirements

- [Node.js](https://nodejs.org/): Version 24.x or higher
- [npm](https://www.npmjs.com/): Version 11.x or higher (comes with Node.js)

## Installation

Install dependencies:

```shell
nvm use
npm install
```

## Preview

Run the development server:

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To remove build artifacts and cache:

```shell
npm run clean
```

## Publish

Build the website to be served by GitHub Pages

```shell
npm run build
```

This will:
1. Build the Next.js app to the `out` directory
2. Copy the necessary files to `docs/` for GitHub Pages
3. Preserve existing files in `docs/` (like index.html, CNAME, images)

Push the changes to the repository and the GitHub Workflow will publish the website.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.