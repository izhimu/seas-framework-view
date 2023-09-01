export interface Conf {
  id: string | null;
  confName: string | null;
  confKey: string | null;
  confValue: string | null;
  confInfo: string | null;
}

export const dConf = (): Conf => ({
  id: null,
  confName: null,
  confKey: null,
  confValue: null,
  confInfo: null,
});
