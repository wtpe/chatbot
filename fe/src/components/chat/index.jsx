import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageFrom from '@/components/customMessageForms/StandardMessageForm';
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";
import ChatBot from "../customMessageForms/ChatBot";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    "c062af7d-655f-4a0e-b742-8d4517dfdcee",
    "testuser",
    "1234"
  );
  console.log('chatProps', chatProps);

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            return <ChatBot props={props} activeChat={chatProps.chat} />;
          }

          return (
            <StandardMessageFrom props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
