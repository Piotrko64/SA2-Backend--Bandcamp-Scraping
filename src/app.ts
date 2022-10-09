import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
const app: Application = express();

dotenv.config({ path: ".env" });

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
	res.send("");
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
