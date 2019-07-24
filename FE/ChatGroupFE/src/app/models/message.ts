export interface Message {
  sender: string,
  context: string,
  type: Type
  time: any,
  groupChatId: string
}

export enum Type {
  CHAT,
  JOIN,
  LEAVE
}
