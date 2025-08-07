import { escape } from "../tools/generic.js";
import config from "./../../config.json" with { type: "json" };

export async function execute(client, args, aiHandler) {
  //console.log(aiHandler.gemini_history);
  if (aiHandler.queue >= config.maxQueue) {
    client.broadcast("The queue is full, want to suck my dick instead?");
  } else {
    client.broadcast("Generating reply please be patient");
    const reply = await aiHandler.askGEN(args.join(" "), config.system_message);

    client.broadcast(escape(reply));
  }
}

export var name = "ask";
