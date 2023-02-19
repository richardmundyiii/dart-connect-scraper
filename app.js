import puppeteer from "puppeteer";

const url = "https://tv.dartconnect.com/league/SaCzDA/6210/standings";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let content = await page.evaluate(() => {
    let magicArr = [];
    let divs = [...document.querySelectorAll("tr")];
    let formatted = divs.map((div) => div.innerText.split("."));
    let bLeauge = formatted.splice(2, 8);
    let aLeague = formatted.splice(4, 8);

    aLeague[0][1].forEach((el) => {
      magicArr.push(el);
    });
    return magicArr;
  });
  console.log(content);
  await browser.close();
};

main();
