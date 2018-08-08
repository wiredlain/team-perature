
export class ChatMessageModel {
  public id: string;
  public message: string;
  public confidence: number;
  public isMe:boolean;
  public image:string;

  constructor(id, confidence, message) {
    this.id = id || "";
    this.message = message || "";
    this.confidence = confidence || 0;
    this.isMe = false;
  }

}
