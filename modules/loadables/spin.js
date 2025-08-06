const { States } = require("minecraft-protocol");

exports.execute = (client, ai) => {
  var yaw = 0;

  setInterval(() => {
    if (client.tpConfirm == true && ai.queue > 0) {
      if (yaw >= 180) yaw = -180;

      if (yaw != 180) yaw += 10;

      client.write("position_look", {
        x: client.position.x,
        y: client.position.y,
        z: client.position.z,
        yaw: yaw,
        pitch: 0,
      });
    }
  }, 20);
};
