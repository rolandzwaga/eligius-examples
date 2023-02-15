import fs from "fs";
import path from "path";
import { customFactory } from "./custom-factory";

// Get the final configuration and save it to file
const configuration = customFactory.getConfiguration();

fs.writeFileSync(
  path.resolve(__dirname, "../src/config-data.json"),
  JSON.stringify(configuration, null, 2),
  {
    encoding: "utf-8",
  }
);
