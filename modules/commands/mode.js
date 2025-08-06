const ollama = require("ollama");

exports.execute = (client, arguments, aiHandler) => {
  switch (arguments[0]) {
    case "gemini": {
      client.broadcast("Gemini mode is currently not available.");
      /*
      aiHandler.handler = arguments[0];
      client.broadcast("Set to " + arguments[0]);
      */
      return;
    }

    case "ollama": {
      if (arguments[1] == undefined) {
        aiHandler.handler = arguments[0];
        client.broadcast("Set to " + arguments[0]);
        return;
      } else {
        ollamaOptions(client, arguments, aiHandler);
        return;
      }
    }

    default: {
      client.broadcast("Not an option");
    }
  }

  console.table(aiHandler);
};

async function ollamaOptions(client, arguments, aiHandler) {
  console.log(arguments[1]);
  const list = await ollama.default.list();
  const name_list = [];
  list.models.forEach((model) => {
    name_list.push(model.name);
  });

  switch (arguments[1]) {
    case "list": {
      client.broadcast("Available models for ollama: " + name_list.join(", "));
      return;
    }

    case "set": {
      if (arguments[2] != null && name_list.includes(arguments[2])) {
        aiHandler.ollama_model = arguments[2];

        client.broadcast("Ollama model set to: " + aiHandler.ollama_model);
      } else {
        client.broadcast("Uh you can't do that");
      }
      return;
    }

    default: {
      client.broadcast("Not an option");
    }
  }
}

exports.name = "mode";
