import { Button } from "@material-ui/core";
import React from "react";
import ChatOnline from "../ChatOnline/ChatOnline";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import "./chat.css";

const Chat = () => {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search" className="chatMenuInput" />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write Something..."
            ></textarea>
            <Button
              className="chatSubmitButton"
              variant="outlined"
              //color="success"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};

export default Chat;
