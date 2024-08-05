import "reflect-metadata";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { errorHandler, routeNotFound } from "./middleware";
import { textRoute, imgRoute } from "./routes";


const app: Express = express();
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Ai for Homework Api" });
});
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ message: "Ai for Homework Api" });
});

app.use("/api/v1", textRoute);
app.use("/api/v1", imgRoute);

app.use(routeNotFound);
app.use(errorHandler);

export default app;
