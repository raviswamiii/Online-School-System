import React from "react";

export const AllMessages = () => {
  const messages = [
    {
      id: 1,
      name: "Sadachar Public School",
      message: "Please check the updated schedule.",
      time: "2m",
      image: "https://i.pravatar.cc/150?img=12",
      unread: true,
    },
    {
      id: 2,
      name: "Green Valley School",
      message: "Thank you for the update.",
      time: "1h",
      image: "https://i.pravatar.cc/150?img=32",
      unread: false,
    },
    {
      id: 3,
      name: "Rahul (Student)",
      message: "Sir, I have a doubt.",
      time: "3h",
      image: "https://i.pravatar.cc/150?img=45",
      unread: true,
    },
  ];

  return (
    <div className="h-screen w-full bg-[#ECF4E8] flex flex-col">
      <div className="sticky top-0 z-10 bg-[#4C763B]/80 text-[#ECF4E8] border-b px-4 py-3 flex justify-center items-center">
        <p className="text-lg font-semibold">Messages</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#B0CE88]/30 transition"
          >
            <div className="relative">
              <img
                src={msg.image}
                alt={msg.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-[#4C763B]"
              />

              {msg.unread && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#ECF4E8]"></span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#043915] truncate">
                {msg.name}
              </p>
              <p className="text-sm text-[#4C763B]/80 truncate">
                {msg.message}
              </p>
            </div>

            <p className="text-xs text-[#4C763B]/70">{msg.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
