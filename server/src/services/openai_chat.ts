import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config"

export const chatOpenAi = new ChatOpenAI({
  apiKey: OPENAI_API_KEY, 
  model: "gpt-4o-mini"
});
