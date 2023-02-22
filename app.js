import puppeteer from "puppeteer";

// const mongoose = require("./model/standings");

const url = "https://tv.dartconnect.com/league/SaCzDA/6210/standings";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let content = await page.evaluate(() => {
    let magicArr = [];
    let divs = [...document.querySelectorAll("tr")];
    let formatted = divs.map((div) => div.innerText.replace(/\t/g, " "));
    // let bLeauge = formatted.splice(2, 8);
    let aLeague = formatted.splice(2, 8);

    // aLeague.forEach((el) => {
    //   magicArr.push(el);
    // });
    // return { bLeauge, aLeague };
    return aLeague[0];
  });
  console.log(content);
  await browser.close();
};

// mongoose.save(content);
main();
