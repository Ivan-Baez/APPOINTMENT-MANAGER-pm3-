import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

const server = express();

// Middlewares
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

// Ruta raíz para comprobar que la API funciona
server.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

server.use(router);

export default server;
