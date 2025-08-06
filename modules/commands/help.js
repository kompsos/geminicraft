const fs = require("fs");

exports.execute = (client, args) => {
  var commands = [];
  const directoryPath = "./modules/commands";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const command = require("./../commands/" + file);

      commands.push(command.name);
    });

    client.broadcast(commands.join(", "));
  });
};

exports.name = "help";
