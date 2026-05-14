# GitHub Codespaces ♥️ React

### Setup
```
npm start
npm install vite --save-dev
```

### Deploy to GitHub Pages
1. Install `gh-pages` package:
```
npm install --save-dev gh-pages
```
2. In `package.json` add:
```
"homepage": "https://KaterinaWalter.github.io/repository-name",
"scripts": {
  "start": "BROWSER=none WDS_SOCKET_PORT=0 vite --port 3000",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
  },
```
3. Commit/sync & deploy:
```
npm run deploy
```

