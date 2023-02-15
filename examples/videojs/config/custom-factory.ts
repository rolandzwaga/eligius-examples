import { ConfigurationFactory } from "eligius";

export const TIMELINE_URL = "video/big_buck_bunny.mp4";

const factory = new ConfigurationFactory()
  .init("en-US")
  .addLanguage("en-US", "English")
  .addLanguage("nl-NL", "Nederlands")
  .setLayoutTemplate("template:layoutTemplate")
  .setContainerSelector("#ct-container")
  .addTimeline(TIMELINE_URL, "mediaplayer", 0, false, ".main-presentation")
  .editTimelineProviderSettings()
  .addProvider("mediaplayer")
  .setSystemName("VideoJsTimelineProvider")
  .setSelector(".timeline-div")
  .setVendor("eligius")
  .end();

export { factory as customFactory };
