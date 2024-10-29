import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false
  }
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE_URL,
        methods: ["GET", "POST"],
      },
      addTrailingSlash: false
    });
    res.socket.server.io = io;
    // Additional events and logs for debugging
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("disconnect", () => {
          console.log("Client disconnected:", socket.id);
        });
      });
    } else {
      console.log("Socket.io server already initialized.");
    }
    

  res.end();
};

export default ioHandler;