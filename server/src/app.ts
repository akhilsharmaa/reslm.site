import express, { Request, Response } from 'express';
import bodyParser from "body-parser" 
import cors from 'cors'; 
import morgan from "morgan"
import routes from "./routes/index" 
import {PORT} from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.use(cors({
    origin: "*", 
}))

app.use('', routes)
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Backend connected`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});