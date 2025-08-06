import config from "./../../config.json" with { type: "json" };

export async function execute(client, args, aiHandler) {
  client.run_command(`broadcastraw ${JSON.stringify(config, null, "\t")}`);
}

export var name = "pull";
