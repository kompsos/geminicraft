import config from "./config.json" with { type: "json" };
import { AI } from "./modules/aiHandler.js";
import { Client } from "./modules/bot.js";
import { handleCommand } from "./modules/tools/commands.js";
import { loadPlugins } from "./modules/tools/generic.js";
import parseText from "./modules/tools/parser.js";

const minecraft = new Client(config.username, config.host, config.port, true);
const aiHandler = new AI();
loadPlugins(minecraft, aiHandler);

minecraft.on("chat", (ev) => {
  var message = ev.plainMessage;
  if (message != undefined && message.startsWith(config.prefix)) {
    const parsed = message.slice(config.prefix.length).split(" ");

    var command = parsed[0];
    parsed.shift();

    handleCommand(
      minecraft,
      command,
      parsed,
      aiHandler,
      parseText(ev.senderName).clean,
      ev.sender,
    );
  }
});
