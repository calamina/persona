import { Hono } from "hono";
import { getChannel, getVideos } from "../../utils/youtube";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { dbCreateChannel, dbDeleteChannel, dbGetChannels } from "./youtube.queries";
import type { ChannelNewModel } from "../../db/channel.schema";

export const youtube = new Hono()

  .get("/videos", async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ data: null, error: { message: "Unauthorized" } }, 401);

    const channels = await dbGetChannels(user.id);
    if (!channels) return c.json({ data: null, error: { message: "Database error" } }, 500);

    const data = await getVideos(channels);
    if (!data) return c.json({ data: null, error: { message: "Database error" } }, 500);

    return c.json({ data, error: null });
  })

  .get("/channels", async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ data: null, error: { message: "Unauthorized" } }, 401);

    const data = await dbGetChannels(user.id);
    if (!data) return c.json({ data: null, error: { message: "Database error" } }, 500);

    return c.json({ data, error: null });
  })

  .get("/channels/search", zValidator("query", z.object({ query: z.string().trim().min(1) })), async (c) => {
    const { query } = c.req.valid("query");
    const data = await getChannel(query);

    if (!data) return c.json({ data: null, error: { message: "Database error" } }, 500);

    return c.json({ data, error: null });
  })

  .post(
    "/channels/add",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        youtubeId: z.string(),
        url: z.string(),
        iconURL: z.string(),
      }),
    ),
    async (c) => {
      const user = c.get("user");
      if (!user) return c.json({ data: null, error: { message: "Unauthorized" } }, 401);

      const channelData = c.req.valid("json");
      const channelPayload: ChannelNewModel = {
        ...channelData,
        userId: user.id,
      };

      const res = await dbCreateChannel(channelPayload);

      if (res.error) return c.json({ data: null, error: res.error }, 500);

      return c.json({ data: res.data, error: null }, 200);
    },
  )
  .delete("/channels/:id", zValidator("param", z.object({ id: z.coerce.number() })), async (c) => {
    const { id } = c.req.valid("param");
    const user = c.get("user");
    if (!user) return c.json({ data: null, error: { message: "Unauthorized" } }, 401);

    const { data, error } = await dbDeleteChannel(user.id, id);

    if (error) return c.json({ error: "Database error" }, 500);
    return c.json({ data, error: null });
  });
