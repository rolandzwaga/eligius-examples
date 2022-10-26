import { IEligiusEngine, IEngineConfiguration, IEngineFactory } from "eligius";
import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorkerUrl: function (_, label) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  },
};

export function createEditor(oonfiguration: IEngineConfiguration) {
  const initialCode = JSON.stringify(oonfiguration, null, 2);

  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    schemas: [
      {
        uri: "https://rolandzwaga.github.io/eligius/jsonschema/eligius-configuration.json",
        fileMatch: ["*.json"],
      },
    ],
    validate: true,
    allowComments: true,
  });

  (window as any).editor = monaco.editor.create(
    document.getElementById("container") as HTMLDivElement,
    {
      value: initialCode,
      language: "json",
    }
  );
}

export async function createEngine(
  factory: IEngineFactory,
  engineConfiguration: IEngineConfiguration
) {
  const currentEngine = (window as any).engine as IEligiusEngine;

  if (currentEngine) {
    await currentEngine.destroy();
  }

  const newEngine = factory.createEngine(engineConfiguration);

  newEngine.init().then(() => {
    console.log("Eligius engine ready for business");
  });

  (window as any).engine = newEngine;
}

function reload() {
  const newConfig = (window as any).editor.getValue();
  (window as any).createWithFactory(JSON.parse(newConfig));
}

(window as any).reload = reload;
