import { Hono } from "hono";
import { getfeed } from "../../utils/feed";
import feeds from "../../temp_data/youtube.json";

export const feed = new Hono()

  .get("/", async (c) => {
    const data = await getfeed("gregoire");
    return c.json(data);
  })

  .get("/channels", async (c) => {
    return c.json(feeds);
  });
