import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getDataFromBandcamp } from "./utils/getDataFromBandcamp";

const app: Application = express();

dotenv.config({ path: ".env" });

app.use(cors());

app.get("/", async (_req: Request, res: Response) => {
	res.send("nothing");
});

app.get("/dataBandcamp", async (_req: Request, res: Response) => {
	try {
		const dataForIframes = await getDataFromBandcamp();
		res.send(dataForIframes);
	} catch (err) {
		console.log(err);
		res.send("problem");
	}
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
