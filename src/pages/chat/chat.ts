import { Component, ViewChild, NgZone } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ChatMessageModel } from "../../models/chatMessageModel";
import { ChatProvider } from "../../providers/chat/chat";

@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage {
  @ViewChild("txtChat") txtChat: any;
  @ViewChild("content") content: any;
  public messages: any[];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
	public chatProvider: ChatProvider,
	private _zone: NgZone
  ) {
    this.messages = [];
  }

  	public sendMessage() {
		  console.log('enter');
		  
	  	let thisRef = this;
		this.txtChat.setFocus();
		let msg = this.txtChat.content.replace("\n", " ");
		let chatMessage = new ChatMessageModel(1, 0, msg);
		chatMessage.image = "assets/me.png";
		chatMessage.isMe = true;
		thisRef._zone.run(() => {
			//without this timeout the list scrolls
			//to the second to last element.
			//It's some kind of race condition
			setTimeout(() => {
				thisRef.content.scrollToBottom(300); //300ms animation speed
			});
		});
		this.messages.push(chatMessage);
		this.chatProvider.getMessage(msg).subscribe(
			mensaje => {
				let chatMessageModel = new ChatMessageModel(1,1, mensaje.text[0]);
				chatMessageModel.isMe = false;
				chatMessageModel.image = "assets/watson.png";
				thisRef._zone.run(() => {
					//without this timeout the list scrolls
					//to the second to last element.
					//It's some kind of race condition
					setTimeout(() => {
						thisRef.content.scrollToBottom(300); //300ms animation speed
					});
				});
				this.messages.push(chatMessageModel);
			}
		)
		//let chatMessage = new ChatMessageModel(this.userId, this.txtChat.content);
		this.txtChat.clearInput();
  	}

  public ionViewWillEnter() {
		this.chatProvider.getMessage('').subscribe(
			mensaje => {
				let chatMessageModel = new ChatMessageModel(1,1, mensaje.text[0]);
				chatMessageModel.isMe = false;
				chatMessageModel.image = "assets/watson.png";
				this.messages.push(chatMessageModel)
			}
		)

	  
  }
}
