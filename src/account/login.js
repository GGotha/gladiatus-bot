const puppeteer = require("puppeteer");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

class Login {
  async start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://lobby.gladiatus.gameforge.com", {
      waitUntil: "load"
    });

    if (await page.waitForSelector(".openX_int_closeButton")) {
      const selector = ".openX_int_closeButton";
      await page.evaluate(
        selector => document.querySelector(selector).children[0].click(),
        selector
      );
    }

    if (await page.waitForSelector(".tabsList")) {
      const selector = ".tabsList";
      await page.evaluate(
        selector => document.querySelector(selector).children[0].click(),
        selector
      );
    }

    if (
      (await page.waitForSelector("input[type=email]")) &&
      (await page.waitForSelector("input[type=password]")) &&
      (await page.waitForSelector("button[type=submit]"))
    ) {
      const email = "input[type=email]";
      const password = "input[type=password]";
      const button = "button[type=submit]";

      await page.focus(email);
      await page.keyboard.type(process.env.LOGIN);

      await page.focus(password);
      await page.keyboard.type(process.env.PASSWORD);

      await page.click(button);
    }

    if (await page.waitForSelector("#joinGame")) {
      const selector = "#joinGame";
      await page.evaluate(
        selector =>
          document.querySelector(selector).children[0].children[0].click(),
        selector
      );

      const playBtn = ".btn";
      await page.evaluate(
        playBtn => document.querySelector(playBtn).click(),
        playBtn
      );
    }
  }
}

module.exports = new Login();
