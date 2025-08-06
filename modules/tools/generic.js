const fs = require("fs");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadPlugins(client, ai) {
  const directoryPath = "./modules/loadables";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const plugin = require("./../loadables/" + file);
      plugin.execute(client, ai);
    });
  });
}

escape = function (str) {
  return str
    .replace(/[\\]/g, "")
    .replace(/[\"]/g, "")
    .replace(/[\/]/g, "")
    .replace(/[\b]/g, "")
    .replace(/[\f]/g, "")
    .replace(/[\n]/g, "")
    .replace(/[\r]/g, "")
    .replace(/[\t]/g, "");
};

module.exports = {
  delay,
  loadPlugins,
  escape,
};
