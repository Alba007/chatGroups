export interface Message {
  sender: string,
  context: string,
  type: Type,
  time: any,
  groupChatId: string,
  //image: any
}

export enum Type {
  CHAT,
  JOIN,
  LEAVE,
  IMG
}
