import { IEngineConfiguration, EngineFactory } from 'eligius';
import * as engineConfig from './config-data.json';
import WebpackResourceImporter from './webpack-resource-importer';
const factory = new EngineFactory(new WebpackResourceImporter(), window);
const writableConfig = JSON.parse(JSON.stringify(engineConfig)) as IEngineConfiguration;
const engine = factory.createEngine(writableConfig);
engine.init().then(()=> {console.log('Eligius engine ready for business');});