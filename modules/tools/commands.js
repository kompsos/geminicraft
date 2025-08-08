const fs = require("fs");
const config = require("./../../config.json");
function handleCommand(client, name, arguments, aiHandler, username, sender) {
  const directoryPath = "./modules/commands";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const command = require("./../commands/" + file);

      if (command.name === name) {
        if (
          config.verification_mode &&
          command.verification != undefined &&
          command.verification == true
        ) {
          var includes = false;
          client.verified_usernames.forEach((player) => {
            if (player.username == username) includes = true;
            return;
          });

          if (username != undefined && includes) {
            command.execute(client, arguments, aiHandler, username, sender);
            return;
          } else {
            client.broadcast("Nuh uh you can't do that! You are not verified!");
            return;
          }
        } else {
          command.execute(client, arguments, aiHandler, username, sender);
        }
      }
    });
  });
}

module.exports = { handleCommand };
