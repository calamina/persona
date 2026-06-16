import { XMLParser } from "fast-xml-parser";
import YouTube from "youtube-sr";
import type { ChannelModel } from "../db/channel.schema";

interface VideoOut {
  id: string;
  author: string;
  published: string;
  title: string;
}

export const getVideos = async (channels: ChannelModel[]): Promise<VideoOut[] | undefined> => {
  const MAX_VIDEOS_PER_CHANNEL = 3;
  const MAX_VIDEOS_TOTAL = 40;

  const url = "http://www.youtube.com/feeds/videos.xml?channel_id=";
  const parser = new XMLParser();
  const results: VideoOut[] = [];

  const fetchPromises = channels.map(async (channel) => {
    try {
      const response = await fetch(url + channel.youtubeId);
      const result = await response.text();
      const chan = parser.parse(result);
      let entries = chan?.feed?.entry;

      if (entries && !Array.isArray(entries)) {
        entries = [entries];
      }

      const slicedEntries = entries?.slice(0, MAX_VIDEOS_PER_CHANNEL);
      if (!slicedEntries) return;

      for (const entry of slicedEntries) {
        results.push({
          id: entry.id.replace("yt:video:", ""),
          title: entry.title,
          author: entry.author?.name || channel.name,
          published: entry.published,
        });
      }
    } catch (error) {
      console.debug("error", error);
    }
  });

  await Promise.all(fetchPromises);

  const orderedResults = results
    ?.sort((a: VideoOut, b: VideoOut) => (a.published > b.published ? -1 : 1))
    ?.slice(0, MAX_VIDEOS_TOTAL);

  return orderedResults;
};

export async function getChannel(query: string) {
  const response = await YouTube.searchOne(query, "channel");
  return response;
}
