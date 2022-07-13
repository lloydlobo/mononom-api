import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";
import pretty from "pretty";
import { cheerioLoad } from "./cheerioLoad";

let scrapedDataArray: string[] = [];
export const createServer = () => {
  const app = express();
  app.use(cors());

  app.get("/", (_req, res) => {
    res.json({
      name: "Welcome to api",
      endpoints: ["/healthz", "/message/:name", "/apiCoin"],
    });
  });
  const url = `https://coinmarketcap.com/`;

  axios.get(url).then((response) => {
    const data = response.data;
    // console.log(pretty(data));
    if (!data) throw new Error("Invalid data. Expected data not received");
    (async () => {
      const scrapeData = cheerioLoad(await data);
      scrapedDataArray.push(scrapeData);
      // console.log(scrapeData);
    })();
  });

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (_req, res) => {
      return res.json({ ok: true });
    })
    .get("/apiCoin", (req, res) => {
      return res.json(scrapedDataArray);
    });

  return app;
};

// cspell:ignore healthz
