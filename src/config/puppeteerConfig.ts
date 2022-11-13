import { PuppeteerLifeCycleEvent } from "puppeteer";

export const puppeteerConfig = async () => ({
	ignoreDefaultArgs: ["--disable-extensions"],
	headless: true,
	args: ["--no-sandbox"],
});

interface Network {
	waitUntil: PuppeteerLifeCycleEvent;
	timeout: number;
}

export const configNetwork: Network = {
	waitUntil: "load",
	timeout: 0,
};
