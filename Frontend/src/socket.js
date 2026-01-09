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
