const io = require("socket.io-client");
const socket = io("ws://127.0.0.1:3000", {
    extraHeaders: "",
});
socket.on("connection", () => {
    console.log("connected");
    socket.emit("subscribe pairs update", 123)
});
socket.on("disconnect", () => {
    console.log("disconnected");
})
socket.on("connect_error", (err) => {
    console.log("error", err);
})