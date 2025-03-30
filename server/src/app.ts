import express, { Request, Response } from 'express';
import bodyParser from "body-parser" 
import cors from 'cors'; 
import morgan from "morgan"
import routes from "./routes/index"

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.use(cors({
    origin: "*", 
}))

app.use('', routes)
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to advium backend.');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});