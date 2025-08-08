import config from "./../../config.json" with { type: "json" };
import crypto from "crypto";

export async function execute(client, args, ai, username, sender) {
  if (args[0] == client.security_key) {
    client.verified_usernames.push({ username: username, sender: sender });
    client.broadcast(
      username + " has been verified, verification is lost apon logging out",
    );
  } else {
    client.broadcast("Invalid security key!");
  }

  client.security_key = crypto.randomBytes(32).toString("hex");
}

export const name = "verify";
export const verification = false;
