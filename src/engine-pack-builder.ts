import fs from "fs-extra";
import path from "path";
import generateBootSourceCode from "./helper/boot-generator";
import generateImporterSourceCode from "./helper/importer-generator";

const configPath = process.argv[2];

buildEnginePack(configPath);

function buildEnginePack(configurationPath: string) {
  const destinationPath = path.dirname(configurationPath);
  const config = loadConfiguration(configurationPath);

  if (
    fs.existsSync(path.join(destinationPath, "webpack-resource-importer.ts"))
  ) {
    fs.unlinkSync(path.join(destinationPath, "webpack-resource-importer.ts"));
  }
  if (fs.existsSync(path.join(destinationPath, "boot.ts"))) {
    fs.unlinkSync(path.join(destinationPath, "boot.ts"));
  }

  const importerSource = generateImporterSourceCode(
    config,
    path.dirname(configurationPath)
  );
  saveSource(
    importerSource,
    path.join(destinationPath, "webpack-resource-importer.ts")
  );

  const bootSource = generateBootSourceCode(config, configurationPath);
  saveSource(bootSource, path.join(destinationPath, "boot.ts"));
}
function loadConfiguration(configurationPath: string) {
  const rawdata = fs
    .readFileSync(configurationPath, "utf8")
    .replace(/^\uFEFF/, "");
  const config = JSON.parse(rawdata);
  return config;
}

function saveSource(sourceContent: string, destinationPath: string) {
  fs.writeFileSync(destinationPath, sourceContent, {
    encoding: "utf8",
  });
}
