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

  /* ---------------- Fetch School ---------------- */
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

  /* ---------------- Fetch Messages (REST) ---------------- */
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

  /* ---------------- Send Message ---------------- */
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

  /* ---------------- SOCKET: Join Room ---------------- */
  useEffect(() => {
    if (!chatId || !user?.id) return;

    const join = () => {
      socket.emit("joinRoom", {
        senderId: user.id,
        receiverId: chatId,
      });
    };

    // join immediately
    join();

    // re-join on reconnect (VERY IMPORTANT)
    socket.on("connect", join);

    return () => {
      socket.off("connect", join);
    };
  }, [chatId, user.id]);

  /* ---------------- SOCKET: Receive Message ---------------- */
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


  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    if (chatId) {
      fetchSchool();
      fetchMessages();
    }
  }, [chatId]);

  /* ---------------- Auto Scroll ---------------- */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- UI ---------------- */
  return (
    <div className="h-screen bg-green-100">
      <div className="flex items-center gap-3 bg-green-800 px-4 py-2">
        <img
          src={`${backendURL}${schoolData?.schoolLogo}`}
          alt="School Logo"
          className="h-10 w-10 rounded-full bg-white"
        />
        <p className="text-xl text-white font-semibold">
          {schoolData?.schoolName || "Loading..."}
        </p>
      </div>

      <div className="h-[82vh] overflow-y-auto px-2">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === user.id || msg.sender === user.id;

          return (
            <div
              key={msg._id}
              className={`flex p-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              <p className="bg-orange-200 px-3 py-1 rounded-md max-w-[70%]">
                {msg.text}
              </p>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2 p-2 fixed bottom-0 w-full border-t bg-white">
        <input
          className="outline-none border w-full rounded-full px-4"
          type="text"
          placeholder="message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-800 px-8 py-2 rounded-full text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};
