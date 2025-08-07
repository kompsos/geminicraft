import config from "./../config.json" with { type: "json" };
import { queryOl } from "./ai/ollama.js";

export class AI {
  constructor() {
    this.ollama_model = config.ollama_default_model;
    this.queue = 0;
    this.ollama_history = [];
  }

  async askGEN(message, system_message, use_memory, local_chat_history) {
    let didTimeout = false;

    try {
      this.queue++;
      const response = await Promise.race([
        queryOl(
          this.ollama_model,
          message,
          system_message,
          this.ollama_history,
          local_chat_history,
        ),
        new Promise((_, reject) =>
          setTimeout(() => {
            didTimeout = true;
            reject(new Error("Timeout"));
          }, config.timeout),
        ),
      ]);

      if (use_memory) {
        this.pushOllama({ role: "user", content: message });
        this.pushOllama({
          role: "model",
          content: response.message.content,
        });
      }

      this.queue--;
      return response.message.content;
    } catch (err) {
      this.queue--;
      console.error(err);
      return "A queued generation has timed out, input: " + message;
    }
  }

  pushOllama(message) {
    if (this.ollama_history >= config.ollama_history_size)
      this.ollama_history.shift();
    this.ollama_history.push(message);
  }
}
