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
