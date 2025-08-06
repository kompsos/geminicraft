const config = require("./../config.json");
const mc = require("minecraft-protocol");
const mcData = require("minecraft-data")(config.version);
const Item = require("prismarine-item")(config.version);
const EventEmitter = require("node:events");
const crypto = require("crypto");
const { delay } = require("./tools/generic");

class Client extends EventEmitter {
  constructor(username, host, port, reconnect) {
    super();
    this.username = username;
    this.host = host;
    this.port = port;

    this.client = mc.createClient({
      host: host,
      port: port,
      username: username,
      version: config.version,
    });

    this.client.on("end", (reason) => {
      console.error(
        "Disconnected from " + host + ":" + port + "\nReason: " + reason,
      );

      this.connected = false;

      if (reconnect) {
        delay(6000).then(() => {
          this.client.connect(port, host);
        });
      }
    });

    this.client.on("connect", () => {
      console.info("Successfully connected to " + host + ":" + port);
      this.connected = true;
    });

    this.client.on("playerChat", (ev) => {
      this.emit("chat", ev);
    });

    this.client.on("state", (newState) => {
      this.state = newState;
    });

    this.client.on("position", (data) => {
      this.position = data;
      this.write("teleport_confirm", { teleportId: data.teleportId });

      this.tpConfirm = true;
      this.emit("position", data);
    });
  }

  message(message) {
    this.client.chat(message, {
      timestamp: Date.now(),
      salt: crypto.randomBytes(8),
      preview: undefined,
      didPreview: false,
    });
  }

  write(packet, data) {
    this.client.write(packet, data);
  }

  arm_swing(hand) {
    this.write("arm_animation", hand);
  }

  async run_command(message) {
    this.set_item(373);
    var pos = {
      x: this.position.x,
      y: this.position.y - 1,
      z: this.position.z,
    };

    await this.dig(pos);
    this.place(pos);
    this.set_item(0);
    delay(20).then(() => {
      this.write("update_command_block", {
        location: pos,
        command: message,
        mode: 1,
        flags: 0b100,
      });
    });
  }

  broadcast(message) {
    this.run_command(`bcraw ${message} `);
  }

  set_item(id) {
    this.write("set_creative_slot", {
      slot: 36,
      item: {
        present: true,
        itemId: id,
        itemCount: 1,
        nbtData: undefined,
      },
    });
  }

  place(pos) {
    this.write("block_place", {
      hand: 0,
      location: pos,
      face: 1,
      cursorX: 0.5,
      cursorY: 1.0,
      cursorZ: 0.5,
      insideBlock: false,
      sequence: 0,
    });
    this.arm_swing(0);
  }

  async dig(pos) {
    this.write("block_dig", {
      status: 0,
      location: pos,
      face: 1,
    });

    await delay(20).then(() => {
      this.write("block_dig", {
        status: 2,
        location: pos,
        face: 1,
      });
      this.arm_swing(0);
    });
  }
}

module.exports = { Client };
