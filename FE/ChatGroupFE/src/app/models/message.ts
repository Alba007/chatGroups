export interface Message {
  sender: string,
  context: string,
  type: Type
  time: any,
  groupChatId: string,
  file:string
}

export enum Type {
  CHAT,
  JOIN,
  DELETE,
  IMAGE
}
