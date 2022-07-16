import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
const app: Application = express();

dotenv.config({ path: ".env" });

const hello: string = "HELLO WORLD";

app.get("/", (_req: Request, res: Response) => {
	res.send(hello);
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
