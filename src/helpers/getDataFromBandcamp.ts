import puppeteer from "puppeteer";

import { ArrayIframesBandcamp } from "../@types/ArrayIframesBandcamp";
import { configNetwork, puppeteerConfig } from "../config/puppeteerConfig";
import { websitesUrl } from "../config/websitesUrl";
import { delay } from "./delay";

export async function getDataFromBandcamp() {
	const iframes: ArrayIframesBandcamp = [];
	const { urlBandcamp } = websitesUrl;

	try {
		const browser = await puppeteer.launch(await puppeteerConfig());
		const page = await browser.newPage();

		await page.goto(urlBandcamp, configNetwork);

		const allAlbumsUser = await page.$$("#music-grid > li > a");

		for (let i = 0; i <= allAlbumsUser.length - 1; i++) {
			const allAlbums = await page.$$("#music-grid > li > a");

			await allAlbums[i].click();
			await page.waitForNavigation(configNetwork);

			const tracks = await page.$$("td > .title > a");
			const tracksLength = tracks.length;

			const titlesAllTracks: Array<string> = [];

			for (let i = 0; i <= tracksLength - 1; i++) {
				const trackTitle = await page.evaluate((element) => {
					return (element as HTMLElement).innerText;
				}, tracks[i]);
				titlesAllTracks.push(trackTitle);
			}

			const shareButton = await page.$(".share-embed > .share-embed-label > button");
			await shareButton?.click();

			await delay(400);

			const buttonEmbed = await page.$(".embed-other-services.panel-section  > a");
			await buttonEmbed?.click();

			const bigSizeElement = await page.$(".sizechoice.large > .sizepreview > img");
			await bigSizeElement?.click();

			const checkbox = await page.$('label > input[data-bind="checked: show_tracklist"]');
			await checkbox?.click();

			const inputElement = await page.$("input.embed_text");

			const dataIframe = await page.evaluate((element) => {
				return (element as HTMLInputElement).value;
			}, inputElement);

			iframes.push({ iframeLink: dataIframe, mainTitles: titlesAllTracks });

			await page.goto(urlBandcamp, configNetwork);
		}

		await browser.close();

		return iframes;
	} catch (err) {
		console.log(err);
		return null;
	}
}
