import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getDataFromBandcamp } from "./utils/getDataFromBandcamp";
import { ArrayIframesBandcamp } from "./@types/ArrayIframesBandcamp";
import { puppeteerConfig } from "./config/puppeteerConfig";
import { websitesUrl } from "./config/websitesUrl";
import puppeteer from "puppeteer";
const app: Application = express();

dotenv.config({ path: ".env" });

app.use(cors());

app.get("/dataBandcamp", async (_req: Request, res: Response) => {
	const iframes: ArrayIframesBandcamp = [];
	const { urlBandcamp } = websitesUrl;

	const browser = await puppeteer.launch(await puppeteerConfig());
	const page = await browser.newPage();

	await page.goto(urlBandcamp, {
		waitUntil: "networkidle2",
	});

	const allAlbumsUser = await page.$$("#music-grid > li > a");

	for (let i = 0; i <= allAlbumsUser.length - 1; i++) {
		const allAlbums = await page.$$("#music-grid > li > a");

		await allAlbums[i].click();
		await page.waitForNavigation();

		const tracks = await page.$$("td > .title > a");
		const tracksLength = tracks.length;

		const titlesAllTracks: Array<string> = [];

		for (let i = 0; i <= tracksLength - 1; i++) {
			const trackTitle = await page.evaluate((element) => {
				return (element as HTMLElement).innerText;
			}, tracks[i]);
			titlesAllTracks.push(trackTitle);
		}

		const shareButton = await page.$(".share-embed");
		await shareButton?.click();

		const buttonEmbed = await page.$(".embed-other-services.panel-section  > a");
		await buttonEmbed?.click();

		const bigSizeElement = await page.$(".sizechoice.large > .sizepreview");
		await bigSizeElement?.click();

		const checkbox = await page.$('label > input[data-bind="checked: show_tracklist"]');
		await checkbox?.click();

		const inputElement = await page.$("input.embed_text");

		const dataIframe = await page.evaluate((element) => {
			return (element as HTMLInputElement).value;
		}, inputElement);

		iframes.push({ iframeLink: dataIframe, mainTitles: titlesAllTracks });

		await page.goto(urlBandcamp, {
			waitUntil: "networkidle2",
		});
	}

	await browser.close();

	res.send(iframes);
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
