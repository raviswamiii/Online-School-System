import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import { jwtDecode } from "jwt-decode";

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
      const response = await axios.get(
        `${backendURL}/schools/getSchool/${chatId}`
      );

      if (response.data.success) {
        setSchoolData(response.data.school);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (chatId) fetchSchool();
  }, [chatId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: chatId,
      text: newMessage,
    });
    console.log(user);

    setMessages((prev) => [...prev, { text: newMessage, sender: user.id }]);

    setNewMessage("");
  };

  useEffect(() => {
    if (!chatId || !user?.id) return;

    socket.emit("joinRoom", {
      senderId: user.id,
      receiverId: chatId,
    });
  }, [chatId]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-screen bg-green-100">
      <div className="flex items-center gap-3 bg-green-800 px-4 py-2">
        <img
          src={`${backendURL}${schoolData?.schoolLogo}`}
          alt="School Logo"
          className=" overflow-hidden h-10 w-10 border rounded-full bg-white"
        />
        <p className=" text-xl text-white font-semibold">
          {schoolData?.schoolName || "Loading..."}
        </p>
      </div>

      <div className="h-[82vh] overflow-y-auto">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="flex justify-end p-2">
              <p className="bg-orange-200 text-md font-semibold px-3 py-1 rounded-md">
                {msg.text}
              </p>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2 p-2 fixed bottom-0 w-full border-t">
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
          className="border bg-green-800 font-semibold text-lg px-8 py-2 rounded-full text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};
