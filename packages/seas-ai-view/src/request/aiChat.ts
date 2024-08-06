import { Result, api } from "@izhimu/seas-core";
import { AiInput, AiOutput } from "../entity/aiChat.ts";

const url = "/ai/chat";

export function chat(input: AiInput): Promise<Result<AiOutput>> {
  return api().post(`${url}`, input);
}

export function chatStream(input: AiInput): Promise<Result<AiOutput>> {
  return api().post(`${url}/stream`, input);
}
