const esbuild = require("esbuild");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const fs = require("fs");
const path = require("path");
const { emptyDirSync } = require("fs-extra");

const outputDirectory = path.join(process.cwd(), "docs/requestanimationframe");
emptyDirSync(outputDirectory);

const htmlTemplate = fs.readFileSync("./template-index.html", {
  encoding: "utf-8",
});

fs.copyFileSync(
  "./examples/shared/create-engine.ts",
  "./examples/requestanimationframe/src/create-engine.ts"
);

fs.copyFileSync(
  "./examples/shared/monaco.css",
  "./examples/requestanimationframe/src/css/monaco.css"
);

esbuild
  .build({
    entryPoints: {
      app: "examples/requestanimationframe/src/boot.ts",
      css: "examples/requestanimationframe/src/css/test.css",
      "monaco.css": "examples/requestanimationframe/src/css/monaco.css",
      "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
      "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    },
    entryNames: "[name].bundle",
    bundle: true,
    minify: false,
    metafile: true,
    outdir: "docs/requestanimationframe",
    loader: {
      ".html": "text",
      ".ttf": "file",
    },
    plugins: [
      htmlPlugin({
        files: [
          {
            entryPoints: [
              "examples/requestanimationframe/src/boot.ts",
              "examples/requestanimationframe/src/css/test.css",
              "examples/requestanimationframe/src/css/monaco.css",
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
