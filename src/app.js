const Express = require("express");
const http = require("http");
const SocketIO = require("socket.io");

const app = Express();

const server = http.createServer(app);
const io = SocketIO(server);

app.use(Express.static("resources"));

app.get("/", (req, res) => {
  res.sendFile("resources/ws.html", { root: __dirname + "/../" });
});

io.of("/chat").on("connection", ws => {
  ws.on("message", message => {
    // console.log("received: ", message);
    io.of("/chat").send(message.trim());
  });
});

server.listen(3000, () => {
  console.log("Express app running on port:3000");
});
