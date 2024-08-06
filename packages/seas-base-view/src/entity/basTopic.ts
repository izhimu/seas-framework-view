export interface BasTopic {
  id: string | null;
  sort: number | null;
  topicName: string | null;
  topicCode: string | null;
  indexUrl: string | null;
  remarks: string | null;
  menuIds: string[] | null;
}

export const dBasTopic = (): BasTopic => ({
  id: null,
  sort: 0,
  topicName: null,
  topicCode: null,
  indexUrl: null,
  remarks: null,
  menuIds: null,
});

export interface BasTopicMenu {
  topicId: string | null;
  menuIds: string[] | undefined;
  menuPIds: string[] | undefined;
}

export const dBasTopicMenu = (): BasTopicMenu => ({
  topicId: null,
  menuIds: undefined,
  menuPIds: undefined,
});

export interface BasAuthTopic {
  id: string | null;
  topicId: string | null;
  roleId: string | null;
  topicIds: any[] | null;
}

export const dBasAuthTopic = (): BasAuthTopic => ({
  id: null,
  topicId: null,
  roleId: null,
  topicIds: null,
});
