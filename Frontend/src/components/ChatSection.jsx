import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";

export const ChatSection = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [schoolData, setSchoolData] = useState(null);

  const scrollRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { chatId } = useParams();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const fetchSchool = async () => {
    try {
      const res = await axios.get(`${backendURL}/schools/getSchool/${chatId}`);
      if (res.data.success) {
        setSchoolData(res.data.school);
      }
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/messages/getMessages/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        `${backendURL}/messages/sendMessages`,
        {
          receiverId: chatId,
          text: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewMessage("");
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!chatId || !user?.id) return;

    const join = () => {
      socket.emit("joinRoom", {
        senderId: user.id,
        receiverId: chatId,
      });
    };

    join();
    socket.on("connect", join);

    return () => {
      socket.off("connect", join);
    };
  }, [chatId, user.id]);

  useEffect(() => {
    const handleReceive = (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    };

    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, []);

  useEffect(() => {
    if (chatId) {
      fetchSchool();
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-[#efeae2]">
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-[#075e54] px-5 py-3 shadow">
        <img
          src={schoolData?.schoolLogo}
          alt="School Logo"
          className="h-11 w-11 rounded-full object-cover bg-white"
        />
        <div>
          <p className="text-white text-lg font-semibold">
            {schoolData?.schoolName || "Loading..."}
          </p>
          <p className="text-green-100 text-xs">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === user.id || msg.sender === user.id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg shadow max-w-[70%] text-sm
                  ${
                    isMe
                      ? "bg-[#dcf8c6] rounded-br-none"
                      : "bg-white rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <div className="sticky bottom-0 bg-[#f0f0f0] px-4 py-2 border-t flex items-center gap-2">
        <input
          className="flex-1 rounded-full px-4 py-2 outline-none border bg-white focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#075e54] hover:bg-[#064c44] text-white px-6 py-2 rounded-full font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
