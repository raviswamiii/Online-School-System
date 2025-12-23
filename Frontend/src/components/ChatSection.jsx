import React, { useEffect, useRef, useState } from "react";

export const ChatSection = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { text: newMessage, sender: "me" }]);

    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-screen bg-green-100">
      <div className="flex items-center gap-3 bg-green-800 px-4 py-2">
        <img className="h-10 w-10 border rounded-full bg-white" />
        <p className=" text-xl text-white font-semibold">School Name...</p>
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
