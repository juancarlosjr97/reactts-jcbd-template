const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp("src");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@app": path.join(appSrc),
      "@pages": path.join(appSrc, "pages"),
      "@components": path.join(appSrc, "components"),
      "@services": path.join(appSrc, "services"),
      "@utils": path.join(appSrc, "utils"),
      "@assets": path.join(appSrc, "assets"),
      "@styles": path.join(appSrc, "styles"),
      "@environment$": path.join(appSrc, "environment/environment.ts"),
    },
  },
};
