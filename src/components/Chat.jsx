import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [massage, setMassage] = useState([]);
  const [newMassage, setNewMassage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [massage]);

  const fetchChatMassages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat);
    const chatMassages = chat?.data?.massages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId.firstName,
        lastName: senderId.lastName,
        text,
      };
    });
    setMassage(chatMassages);
  };

  useEffect(() => {
    fetchChatMassages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    //as soon as page loaded, socket connection made at jointChat event is emmites
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on("massageReceived", ({ firstName, text }) => {
      console.log(firstName + " " + text);
      setMassage((massage) => [...massage, { firstName, text }]);
    });

    return () => {
      socket.disconnect(); //when component is unmount
    };
  }, [userId, targetUserId]);

  const sendMassage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMassage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMassage,
    });
    setNewMassage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md h-[500px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-700 text-white p-4 text-center font-semibold text-lg tracking-wide shadow-md">
          Chat
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {massage.map((msg, index) => {
            const isUser = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`chat ${isUser ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header text-gray-300">{msg.firstName}</div>
                <div
                  className={`chat-bubble ${
                    isUser ? "bg-fuchsia-700" : "bg-slate-600"
                  } text-white`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer text-xs text-gray-400">
                  {isUser ? "Seen" : "Delivered"}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 bg-gray-700 flex items-center gap-2">
          <input
            value={newMassage}
            onChange={(e) => setNewMassage(e.target.value)}
            type="text"
            placeholder="Type a message"
            className="flex-1 border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
          />
          <button
            onClick={sendMassage}
            className="bg-fuchsia-700 text-white px-4 py-2 rounded-xl hover:bg-fuchsia-500 transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
{
  /* <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {massage.map((msg, index) => {
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
        </div> */
}
