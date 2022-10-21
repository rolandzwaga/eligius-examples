import fs from "fs";
import path from "path";
import dashToCamelCase from "./dash-to-camel-case";

function generateBootSourceCode(config: any, configPath: string) {
  const dirName = path.dirname(configPath);
  const configFileName = configPath.substr(dirName.length + 1);

  const bootSourceCode = _generateBootSource(config, configFileName, dirName);

  /*const ast = Parser.parse(bootSourceCode, {
    ecmaVersion: 6,
    sourceType: 'module',
  });
  const formattedCode = generate(ast);*/

  return bootSourceCode; //formattedCode;
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
  lines.push("import {createEngine} from './create-engine';");
  lines.push(
    "window.createWithFactory = createEngine.bind(null, new EngineFactory(new WebpackResourceImporter(), window));"
  );
  lines.push("(window as any).engine = null;");
  lines.push(
    "const writableConfig = JSON.parse(JSON.stringify((engineConfig as any).default)) as IEngineConfiguration;"
  );
  lines.push(
    "const configElm = document.getElementById('config-text') as HTMLTextAreaElement;"
  );
  lines.push(
    "if (configElm) { configElm.value = JSON.stringify(writableConfig, null, 2); }"
  );
  lines.push("createWithFactory(writableConfig);");

  return lines.join("\n");
}

function _generateCssImports(cssPath: string) {
  const entries = fs.readdirSync(cssPath);
  return entries.map((file) => {
    const importName = `css_${dashToCamelCase(path.basename(file, ".css"))}`;
    return `import ${importName} from './css/${file}';`;
  });
}

export default generateBootSourceCode;
