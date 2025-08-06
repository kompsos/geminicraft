import ollama from "ollama";

export async function queryOl(model, input, prompt, history) {
  //if (history[0] != undefined) console.log(history[0].content);
  const response = await ollama.chat({
    model: model,
    messages: history.concat([
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: input },
    ]),
    options: {},
    think: false,
  });

  return response;
}
