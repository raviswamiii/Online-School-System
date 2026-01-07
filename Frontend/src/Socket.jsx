import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  auth: { token },
});

if (token) {
  const user = jwtDecode(token);
  socket.emit("joinUser", user.id);
}

export default socket;





// import { io } from "socket.io-client";
// import React, { useEffect, useMemo, useState } from "react";

// export const Socket = () => {
//   const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL), []);
//   const [messages, setMessages] = useState("");
//   const [room, setRoom] = useState("");
//   const [socketId, setSocketId] = useState("");
//   const [newMessage, setNewMessage] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("message", { messages, room });
//     setMessages("");
//   };

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("Connected to server with ID:", socket.id);
//     });

//     socket.on("message-receive", (msg) => {
//       console.log("New message received:", msg);
//       setNewMessage((messages) => [...messages, msg]);
//     });

//     socket.on("welcome", (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="h-screen flex flex-col justify-center items-center">
//       <div>{socketId}</div>
//       <form onSubmit={handleSubmit} className="flex flex-col ">
//         <input
//           type="text"
//           className="border"
//           value={messages}
//           onChange={(e) => setMessages(e.target.value)}
//           placeholder="type..."
//         />

//         <input
//           type="text"
//           className="border"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           placeholder="room..."
//         />
//         <button type="submit" className="border">
//           Send
//         </button>
//       </form>

//       <div>
//         {newMessage.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//     </div>
//   );
// };
