import express, { Request, Response, Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 8000;
import "./components/discord/discord.service.worker";
import { routes } from "./routes";

app.use(express.json());
routes(app);

export const startServer = () =>
  app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
  });
