export const puppeteerConfig = async () => ({
	ignoreDefaultArgs: ["--disable-extensions"],
	headless: true,
	args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
