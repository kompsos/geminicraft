const config = require("../../config.json");

exports.execute = async (client, ai) => {
  await generate(client, ai);
  setInterval(async () => {
    generate(client, ai);
  }, 720000);
};

async function generate(client, ai) {
  if (client.message_history == 0) {
    const reply = await ai.askGEN(
      `Introduce yourself as ${client.username} and say that you are a minecraft chat interface for Ollama, and that your prefix is ${config.prefix} and that you can type ${config.prefix}help to get a list of commands`,
      "Keep it short and simple, but make it unique every time",
      false,
      [],
    );
    client.broadcast(escape(reply));
  } else {
    if (client.message_history.length > 0) {
      const random =
        client.message_history.slice(-12)[
          Math.floor(Math.random() * client.message_history.slice(-12).length)
        ];
      const reply = await ai.askGEN(
        `You are talking to ${random.role}, comment on \"${random.content}\" then suggest they should use ${config.prefix}ask to chat based on what they said`,
        `Your name is ${client.username}, don't give long winded responses, no emojis, no asterisks, specify the name of the person you are talking to`,
        false,
        [],
      );

      client.broadcast(escape(reply));
    }
  }
}
