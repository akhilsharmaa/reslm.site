import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";
import routes from "./routes/index";
import { PORT } from "./config";
import logger from './utils/logger'; // <-- import winston logger
import path from 'path';

const app = express();
// Use morgan to log HTTP requests with winston
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({
    origin: "*", 
}))

app.use('', routes)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Backend connected`);
});

app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
});