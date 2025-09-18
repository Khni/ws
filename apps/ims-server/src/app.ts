import express, { Request, Response, Express } from "express";
import expressWinston from "express-winston";
import bodyParser from "body-parser";
import { createErrHandlerMiddleware } from "@khaled/error-handler";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import logger from "./logger/winson-logger.js";

import swaggerUi from "swagger-ui-express";

import { OtpRepository } from "./repositories/OtpRepository.js";
import { RegisterRoutes } from "./routes.js";
const app: Express = express();
const errorHandler = createErrHandlerMiddleware(console);
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).send("Express is working successfully");
});

app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
  res.send(swaggerUi.generateHTML(await import("../swagger.json")));
});
RegisterRoutes(app);
app.use(errorHandler);

export default app;
