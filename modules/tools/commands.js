const fs = require("fs");

function handleCommand(client, name, arguments, aiHandler) {
  const directoryPath = "./modules/commands";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const command = require("./../commands/" + file);

      if (command.name === name) {
        command.execute(client, arguments, aiHandler);
      }
    });
  });
}

module.exports = { handleCommand };
