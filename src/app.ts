import Express, { Request, Response } from "express";
import http from "http";
import SocketIO from "socket.io";

const app = Express();

const server = http.createServer(app);
const io = SocketIO(server);

app.use(Express.static("resources"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile("resources/ws.html", { root: __dirname + "/../" });
});

io.of("/chat").on("connection", ws => {
  ws.on("message", message => {
    console.log("received: ", message);
  });

  setInterval(() => {
    ws.send(`${new Date()}`);
  }, 5000);
});

server.listen(3000, () => {
  console.log("Express app running on port:3000");
});
