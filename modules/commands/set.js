exports.execute = (client, arguments, aiHandler) => {
  switch (arguments[0]) {
    case "gemini": {
      aiHandler.handler = arguments[0];
      client.broadcast("Set to " + arguments[0]);
      return;
    }

    case "ollama": {
      aiHandler.handler = arguments[0];
      client.broadcast("Set to " + arguments[0]);
      return;
    }

    default: {
      client.broadcast("Not an option");
    }
  }

  console.table(aiHandler);
};

exports.name = "set";
