import config from "./config.json" with { type: "json" };
import { AI } from "./modules/aiHandler.js";
import { Client } from "./modules/minecraft.js";
import { handleCommand } from "./modules/tools/commands.js";
import { loadPlugins } from "./modules/tools/generic.js";

const minecraft = new Client("E11eGPT1o", "chipmunk.land", 25565, true);
const aiHandler = new AI();
loadPlugins(minecraft, aiHandler);

minecraft.on("chat", (ev) => {
  var message = ev.plainMessage;
  if (message != undefined && message.startsWith(config.prefix)) {
    const parsed = message.slice(config.prefix.length).split(" ");

    var command = parsed[0];
    parsed.shift();

    handleCommand(minecraft, command, parsed, aiHandler);
  }
});
