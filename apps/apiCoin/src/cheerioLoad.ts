import cheerio from "cheerio";

export function cheerioLoad(data: string | Buffer) {
  if (!data) throw new Error("No data to load");
  const $ = cheerio.load(data);

  const title = $("title").text();

  // console.log(title);

  // return $("title").text();
  return title;
}
