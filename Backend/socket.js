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
    socket.join(userId); // 👈 personal room
    console.log("User joined personal room:", userId);
  });

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });
});


};

export const getIO = () => io;



// import { Server } from "socket.io";

// const socketSetUp = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.FRONTEND_URL,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected", socket.id);

//     socket.on("disconnect", () => {
//       console.log("User disconnected", socket.id);
//     });
//   });
// };

// export default socketSetUp;
