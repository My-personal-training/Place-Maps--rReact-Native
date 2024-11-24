module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./app"],
          alias: {
            "@components": "./app/components",
            "@screens": "./app/screens",
            "@models": "./app/models",
            "@utils": "./app/utils",
            "@hooks": "./app/hooks",
            "@constants": "./app/constants",
            "@assets": "./app/assets",
            "@layouts": "./app/layouts",
            "@context": "./app/context",
            "@": "./",
          },
        },
      ],
    ],
  };
};
