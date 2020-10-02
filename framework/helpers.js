/*global page*/
const fs = require("fs");
const retry = require("async-retry");

const takeScreenshot = async (filename) => {
    var targetDir = `./logs/${jasmine["currentSuite"].fullName}`;
    if (typeof jasmine["currentTest"] !== "undefined") {
        targetDir = targetDir +`/${jasmine["currentTest"].description}`;
    }
    fs.mkdirSync(targetDir, { recursive: true });
    const screenshotPath = `${targetDir}/${filename || Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    return screenshotPath;
};

const asyncRetry = async (fn, retries = 5, minTimeout = 500) => {
    await retry(fn, {
        retries: retries,
        factor: 2,
        minTimeout: minTimeout,
        maxTimeout: Infinity,
        randomize: false
    });
};

const goToUrlAndLoad = async (url) => {
    await page.goto(url, {
        waitUntil: "networkidle0"
    });
};

const getFrame = async (selector) => {
    await page.waitForSelector(selector);
    const elementHandle = await page.$(selector);
    return await elementHandle.contentFrame();
};

export {
    takeScreenshot,
    asyncRetry,
    goToUrlAndLoad,
    getFrame
};