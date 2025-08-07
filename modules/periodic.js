const config = require("../config.json");

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
    const reply = await ai.askGEN(
      `Your name is ${client.username}, pick something from your conversation history with anyone, and make a short simple joke about it and how they should chat with you using ${config.prefix}help instead`,
      false,
      client.chat_history,
    );
    client.broadcast(escape(reply));
  }
}
