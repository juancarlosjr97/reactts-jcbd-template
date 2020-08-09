# React TypeScript Template

### Features

- [x] React 16
- [x] Babel
- [x] WebPack
- [x] Local development configuration with HMR Webpack Plugin
- [x] Production build configuration
- [x] ESLint and Prettier
- [x] Husky and Ling Staged to avoid conflicts on style on commits
- [x] .env and .example.env as an example
- [x] Extension declarations
- [x] Manifest for PWA
- [x] Basic configuration of CircleCI
- [x] Alias Webpack and ESlint, and TSConfig to detect aliases
- [x] Dockerise frontend
- [x] Service Workers with Hook
- [x] Adding LocalStorage class
- [x] Adding webpack dev server configuration using script to reuse open tab
- [x] Minified htm

### TODO

- [ ] .htaccess that does not cause conflict with ServiceWorker on production
- [ ] Dockerise frontend with HMR
- [ ] Dockerise with self-certificates and DNS configuration
- [ ] Review source map


      `devtool: isEnvProduction ? shouldUseSourceMap ? "source-map" : false : isEnvDevelopment && "cheap-module-source-map"`

- [ ] Add file limit - 10MB
- [ ] Add variables to index.html using https://www.npmjs.com/package/html-webpack-plugin

### Usage

1.  Re-init git

        rm -rf .git
        git init

2.  Rename the project name on `package.json` changing the `name`
