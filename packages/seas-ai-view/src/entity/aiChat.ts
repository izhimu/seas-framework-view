export interface AiInput {
  chatId: string | null;
  msg: string | null;
}

export interface AiOutput {
  chatId: string;
  msg: string | null;
}

export const dAiInput = (): AiInput => ({
  chatId: null,
  msg: null,
});
