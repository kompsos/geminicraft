import stopword from "stopword";
import config from "./../../config.json" with { type: "json" };

export async function execute(client, args, aiHandler) {
  client.run_command(
    `broadcastraw ${stopword.removeStopwords(args).join(" ")}`,
  );
}

export var name = "filtertest";
