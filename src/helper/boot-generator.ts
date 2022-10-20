import fs from "fs";
import path from "path";
import dashToCamelCase from "./dashToCamelCase";

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
  lines.push(
    "const factory = new EngineFactory(new WebpackResourceImporter(), window);"
  );
  lines.push(
    "const writableConfig = JSON.parse(JSON.stringify(engineConfig)) as IEngineConfiguration;"
  );
  lines.push("const engine = factory.createEngine(writableConfig);");
  lines.push(
    "engine.init().then(()=> {console.log('Eligius engine ready for business');});"
  );

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
