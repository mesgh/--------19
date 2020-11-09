'use strict';
import faker from "faker";
import puppeteer from "puppeteer";
import "regenerator-runtime/runtime";

let page;
let browser;
const [width, height] = [640, 480];
const URL = "https://kodaktor.ru/g/puppetform";

const person = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words(),
};

beforeAll(async () => {
  browser = await puppeteer.launch({
    waitUntil: "domcontentloaded",
    headless: false,
    slowMo: 20,
    args: [`--window-size=${width},${height}`, `--window-position=40,40`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(async () => await browser.close());

describe("Contact form", () => {
  test("person can submit a contact request", async () => {
    await page.goto(URL);
    await page.waitForSelector("[data-test=contact-form]");
    await page.click("input[name=name]");
    await page.type("input[name=name]", person.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", person.email);
    await page.click("input[name=tel]");
    await page.type("input[name=tel]", person.phone);
    await page.click("textarea[name=message]");
    await page.type("textarea[name=message]", person.message);
    await page.click("input[type=checkbox]");
    await page.click("button[type=submit]");
    await page.waitForSelector(".modal");
  }, 15000);
});
