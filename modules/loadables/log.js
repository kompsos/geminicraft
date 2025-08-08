const { States } = require("minecraft-protocol");

exports.execute = (client, ai) => {
  setInterval(() => {
    console.table({
      ollama_model: ai.ollama_model,
      generations_queued: ai.queue,
      last_ollama_response:
        ai.ollama_history[ai.ollama_history.length - 1] == undefined
          ? ""
          : ai.ollama_history[ai.ollama_history.length - 1].content.slice(
              0,
              32,
            ) + "...",
      key: client.security_key,
      verified: client.verified_usernames
        .map((player) => player.username)
        .join(", "),
    });

    console.info(`Connected to ${client.host}:${client.port}`);
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    console.info(
      `Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
    );
  }, 200);
};
