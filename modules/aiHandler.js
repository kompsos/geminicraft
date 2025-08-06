import config from "./../config.json" with { type: "json" };
import { queryGem } from "./ai/gemini.js";
import { queryOl } from "./ai/ollama.js";

export class AI {
  constructor() {
    this.handler = config.default;
    this.ollama_model = config.ollama_default_model;
    this.queue = 0;
    this.gemini_history = [];
    this.ollama_history = [];
  }

  async askGEN(message, system_message) {
    switch (this.handler) {
      case "ollama": {
        this.queue++;
        const response = await queryOl(
          this.ollama_model,
          message,
          system_message,
          this.ollama_history,
        );
        this.queue--;
        this.pushOllama({
          role: "user",
          content: message,
        });

        this.pushOllama({
          role: "model",
          content: response.message.content,
        });
        return response.message.content;
      }

      case "gemini": {
        this.queue++;
        const response = await queryGem(
          config.gemini_model,
          message,
          system_message,
          this.gemini_history,
        );
        this.queue--;
        this.pushGemini({
          role: "user",
          parts: [{ text: message }],
        });

        this.pushGemini({
          role: "model",
          parts: [{ text: response.text }],
        });
        return response.text;
      }
    }
  }

  pushOllama(message) {
    if (this.ollama_history >= config.ollama_history_size)
      this.ollama_history.shift();
    this.ollama_history.push(message);
  }

  pushGemini(message) {
    if (this.gemini_history >= config.gemini_history_size)
      this.gemini_history.shift();
    this.gemini_history.push(message);
  }
}
