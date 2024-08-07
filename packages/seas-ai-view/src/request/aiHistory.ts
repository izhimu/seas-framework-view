import { Result, api } from "@izhimu/seas-core";
import { AiHistory } from "../entity/aiHistory.ts";

const url = "/ai/history";

export function list(chatId: string): Promise<Result<Array<AiHistory>>> {
  return api().post(`${url}/list/${chatId}`);
}
