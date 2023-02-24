const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const StandingA = require("../models/StandingA");
require("dotenv").config();
require("../config/database");

const url = "https://tv.dartconnect.com/league/SaCzDA/6210/standings";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.goto(url);

  const content = await page.evaluate(async () => {
    const rows = [...document.querySelectorAll("tr")];
    const formatted = rows.map((row, index) => {
      const cells = [...row.querySelectorAll("td")];
      const formattedCells = cells.map((cell) => {
        return cell.innerText;
      });
      return formattedCells;
    });
    const aLeague = formatted.splice(12, 14);
    return aLeague;
  });

  //   await Standing.deleteMany({});

  await StandingA.insertMany(
    content.map((row) => ({
      place: Number(row[0]),
      points: Number(row[1]),
      matchesPlayed: Number(row[2]),
      matchesWon: Number(row[3]),
      teamName: row[4],
      legWonPct: row[5],
      zeroOneAvg: row[6],
      cricketAvg: row[7],
      league: "A",
    }))
  );

  await browser.close();
};

main();
