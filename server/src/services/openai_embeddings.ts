import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config"

export const embeddings = new OpenAIEmbeddings({
  apiKey: OPENAI_API_KEY,
  batchSize: 512, // Default value if omitted is 512. Max is 2048
  model: "text-embedding-3-small",
});