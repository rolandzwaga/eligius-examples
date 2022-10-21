import { IEligiusEngine, IEngineConfiguration, IEngineFactory } from "eligius";

export function createEngine(
  factory: IEngineFactory,
  engineConfiguration: IEngineConfiguration
) {
  const currentEngine = (window as any).engine as IEligiusEngine;
  if (currentEngine) {
    currentEngine.destroy();
  }
  const newEngine = factory.createEngine(engineConfiguration);
  newEngine.init().then(() => {
    console.log("Eligius engine ready for business");
  });
  (window as any).engine = newEngine;
}

function reload() {
  const textarea = document.getElementById(
    "config-text"
  ) as HTMLTextAreaElement;
  const configText = textarea.value;
  try {
    const config = JSON.parse(configText);
    (window as any).createWithFactory(config);
  } catch (e) {
    alert("Invalid json!");
  }
}

(window as any).reload = reload;
