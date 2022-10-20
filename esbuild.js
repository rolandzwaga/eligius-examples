const esbuild = require("esbuild");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const fs = require("fs");

const htmlTemplate = fs.readFileSync("./template-index.html", {
  encoding: "utf-8",
});

esbuild
  .build({
    entryPoints: [
      "examples/requestanimationframe/src/boot.ts",
      "examples/requestanimationframe/src/css/test.css",
    ],
    bundle: true,
    minify: false,
    metafile: true,
    outdir: "docs/requestanimationframe",
    loader: {
      ".html": "text",
    },
    plugins: [
      htmlPlugin({
        files: [
          {
            entryPoints: [
              "examples/requestanimationframe/src/boot.ts",
              "examples/requestanimationframe/src/css/test.css",
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
