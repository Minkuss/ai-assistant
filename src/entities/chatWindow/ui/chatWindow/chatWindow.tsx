import {Box} from "@mui/material";
import s from './chatWindow.module.scss';
import {MessagesList} from "@/entities/chatWindow/ui/messagesList/messagesList.tsx";
import {Input} from "@/shared/ui/input/input.tsx";
import {useState} from "react";
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {sendChatMessage} from "@/shared/lib/chats/sendChatMessage.ts";

export const ChatWindow = () => {
    const [ userMessage, setUserMessage ] = useState('');
    const currentChatId = useChatStore((s) => s.currentChatId);
    const messages = useChatStore((s) => s.getCurrentChatMessages());

    const handleSendUserMessage = async () => {
        if (!userMessage.trim() || !currentChatId) return;
        setUserMessage('');
        await sendChatMessage(currentChatId, userMessage.trim());
    }

    return (
      <Box
          className={s['chat-window']}
      >
          <div
            className={s['wrapper']}
          >
              <MessagesList
                  messages={messages}
              />
              <Input
                  label={"Enter text"}
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onEnterPress={handleSendUserMessage}
              />
          </div>
      </Box>
    );
};
