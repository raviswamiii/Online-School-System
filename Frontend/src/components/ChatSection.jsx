import React, { useState, useRef, useEffect } from "react";

export const ChatSection = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "school" },
    { id: 2, text: "I have a question regarding my admission.", sender: "user" },
    { id: 3, text: "Sure! Please tell me.", sender: "school" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#ECF4E8]">
      <div className="sticky top-0 z-10 bg-[#4C763B]/80 text-[#ECF4E8] px-4 py-3 flex items-center gap-3 border-b">
        <div className="h-10 w-10 rounded-full border-2 border-[#ECF4E8] bg-white shrink-0"></div>
        <p className="font-semibold text-lg truncate">Sadachar Public School</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg wrap-break-word ${
                msg.sender === "user"
                  ? "bg-[#FFE797] text-[#043915] rounded-br-none"
                  : "bg-[#4C763B] text-[#ECF4E8] rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t bg-white">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#4C763B]"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-[#4C763B] text-[#ECF4E8] px-4 py-2 rounded-full hover:bg-[#3c5e30] transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
