const path = require("path");

module.exports = {
  webpack: (config, env) => {
    return {
      ...config,
      entry: {
        main: "./src/index.tsx",
        background: "./src/services/background.ts",
      },
      output: {
        ...config.output,
        filename: "static/js/[name].js",
      },
      optimization: {
        ...config.optimization,
        runtimeChunk: false,
      },
    };
  },
};
