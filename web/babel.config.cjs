module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current", esmodules: true}}],
    ["@babel/preset-react", { runtime: "automatic"}],
    "@babel/preset-typescript",
    [
      "babel-preset-vite",
      {
        "env": true,
        "glob": false
      }
    ]
  ],
  plugins: [
    ["babel-plugin-transform-import-meta", { "module": "ES6" }],
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          },
        },
      }
    },
  ]
}
