import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinUser", (userId) => {
    socket.join(userId);
    console.log("User joined personal room:", userId);
  });

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });
});


};

export const getIO = () => io;
