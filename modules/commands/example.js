exports.execute = (client, arguments) => {
  client.run_command("say " + arguments.join(" "));
};

exports.name = "example";
