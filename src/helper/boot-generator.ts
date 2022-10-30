import path from "path";

function generateBootSourceCode(config: any, configPath: string) {
  const dirName = path.dirname(configPath);
  const configFileName = configPath.substr(dirName.length + 1);

  const bootSourceCode = _generateBootSource(config, configFileName, dirName);

  return bootSourceCode;
}

function _generateBootSource(
  config: any,
  configFileName: string,
  dirName: string
) {
  const lines = [];

  lines.push(`import { IEngineConfiguration, EngineFactory } from 'eligius';`);
  lines.push(`import * as engineConfig from './${configFileName}';`);
  lines.push(
    "import WebpackResourceImporter from './webpack-resource-importer';"
  );
  lines.push("import {createEngine, createEditor} from './create-engine';");
  lines.push(
    "(window as any).createWithFactory = createEngine.bind(null, new EngineFactory(new WebpackResourceImporter(), window, {devtools: false}));"
  );
  lines.push("(window as any).engine = null;");
  lines.push(
    "const writableConfig = JSON.parse(JSON.stringify((engineConfig as any).default)) as IEngineConfiguration;"
  );
  lines.push("createEditor(writableConfig);");
  lines.push("(window as any).createWithFactory(writableConfig);");

  return lines.join("\n");
}

export default generateBootSourceCode;
