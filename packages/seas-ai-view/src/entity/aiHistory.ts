export interface AiHistory {
  id?: string;
  chatId: string | null;
  sort: number | null;
  role: "USER" | "ASSISTANT" | "SYSTEM" | "TOOL" | null;
  token: string | null;
  totalToken: string | null;
  messageStr: string | null;
}

export const dAiHistory = (): AiHistory => ({
  id: undefined,
  chatId: null,
  sort: null,
  role: null,
  token: null,
  totalToken: null,
  messageStr: null,
});
