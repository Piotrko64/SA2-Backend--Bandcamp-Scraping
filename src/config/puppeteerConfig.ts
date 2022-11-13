import { PuppeteerLifeCycleEvent } from "puppeteer";

export const puppeteerConfig = async () => ({
	ignoreDefaultArgs: ["--disable-extensions"],
	headless: true,
	args: ["--no-sandbox"],
});

interface Network {
	waitUntil: PuppeteerLifeCycleEvent;
}

export const configNetwork: Network = {
	waitUntil: "networkidle2",
};
