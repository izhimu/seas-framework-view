export interface MqtUser {
  id: string | null;
  username: string | null;
  password: string | null;
  topicAuth: string | null;
}

export const dMqtUser = (): MqtUser => ({
  id: null,
  username: null,
  password: null,
  topicAuth: null,
});
