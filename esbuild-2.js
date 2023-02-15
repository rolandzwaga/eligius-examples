const esbuild = require("esbuild");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const ignorePlugin = require("esbuild-plugin-ignore");
const fs = require("fs");
const path = require("path");
const { emptyDirSync } = require("fs-extra");

const outputDirectory = path.join(process.cwd(), "docs/videojs");
emptyDirSync(outputDirectory);

const htmlTemplate = fs.readFileSync("./template-index.html", {
  encoding: "utf-8",
});

fs.mkdirSync(path.join(outputDirectory, "video"));
fs.copyFileSync(
  "./examples/videojs/src/video/big_buck_bunny.mp4",
  path.join(outputDirectory, "video/big_buck_bunny.mp4")
);

fs.copyFileSync(
  "./examples/shared/create-engine.ts",
  "./examples/videojs/src/create-engine.ts"
);

fs.copyFileSync(
  "./examples/shared/monaco.css",
  "./examples/videojs/src/css/monaco.css"
);

esbuild
  .build({
    entryPoints: {
      app: "examples/videojs/src/boot.ts",
      css: "examples/videojs/src/css/test.css",
      "monaco.css": "examples/videojs/src/css/monaco.css",
      "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
      "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    },
    entryNames: "[name].bundle",
    bundle: true,
    minify: false,
    metafile: true,
    platform: "browser",
    outdir: "docs/videojs",
    external: ["fs", "path"],
    loader: {
      ".html": "text",
      ".ttf": "file",
      ".otf": "file",
    },
    plugins: [
      ignorePlugin([
        {
          resourceRegExp: /^fs$/,
        },
        {
          resourceRegExp: /^path$/,
        },
      ]),
      htmlPlugin({
        files: [
          {
            entryPoints: [
              "examples/videojs/src/boot.ts",
              "examples/videojs/src/css/test.css",
              "examples/videojs/src/css/monaco.css",
            ],
            filename: "index.html",
            htmlTemplate,
          },
        ],
      }),
    ],
  })
  .catch((res) => {
    console.log("error", res);
    process.exit(1);
  });
