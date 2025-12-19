import { Server } from "socket.io";

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ User Connected:", socket.id);
  });
};

export default socketSetup;
