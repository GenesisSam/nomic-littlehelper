import Express, { Request, Response } from "express";
import http from "http";
import path from "path";
import SocketIO from "socket.io";

const app = Express();

const server = http.createServer(app);
const io = SocketIO(server);

app.use(Express.static("resources"));

app.get("/", (req: Request, res: Response) => {
  const htmlFile = path.join(process.cwd(), "resources/ws.html");
  res.sendFile(htmlFile);
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
