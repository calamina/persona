// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from "drizzle-orm";
import { db } from "../../utils/db";
import { getUrlTitle, isValidUrl } from "../../utils/url";
import { favorite, type FavoriteModel } from "../../db/favorite.schema";

export async function dbGetFavorites(userId: string) {
  return await db.select().from(favorite).where(eq(favorite.userId, userId));
}

export async function dbGetFavorite(userId: string, id: number) {
  const [getFavorite] = await db
    .select()
    .from(favorite)
    .where(and(eq(favorite.id, id), eq(favorite.userId, userId)));

  if (!getFavorite) {
    throw new Error("TASK_NOT_FOUND_OR_FORBIDDEN");
  }

  return getFavorite;
}

export async function dbCreateFavorite(userId: string, url: string) {
  try {
    const urlNoProtocol = url.replace(/^https?:\/\//i, "");
    const urlSafe = new URL("https://" + urlNoProtocol);

    // TODO : this is SUPER TIMECONSUMING !!! fix :/
    const isValid = await isValidUrl(urlSafe.href);
    if (!isValid) throw new Error("INVALID_URL");
    const title = await getUrlTitle(urlSafe.href);
    const imgLink = "https://icons.duckduckgo.com/ip3/" + urlSafe.host + ".ico";
    const favicon = (await isValidUrl(imgLink)) ? imgLink : "https://api.iconify.design/material-symbols:book.svg";

    const [newFavorite]: Pick<FavoriteModel, "id">[] = await db
      .insert(favorite)
      // .values({ url: urlSafe.href, userId, title: "", favicon: "" })
      .values({ url: urlSafe.href, userId, title, favicon })
      .returning({ id: favorite.id });

    return { data: newFavorite, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
    };
  }
}

export async function dbUpdateFavorite(userId: string, data: { title: string; url: string; id: number }) {
  const [updatedFavorite] = await db
    .update(favorite)
    .set(data)
    .where(and(eq(favorite.id, data.id), eq(favorite.userId, userId)))
    .returning();

  if (!updatedFavorite) {
    throw new Error("UPDATE_ERROR");
  }

  return updatedFavorite;
}

export async function dbDeleteFavorite(userId: string, id: number) {
  try {
    const [deletedFavorite]: Pick<FavoriteModel, "id">[] = await db
      .delete(favorite)
      .where(and(eq(favorite.id, id), eq(favorite.userId, userId)))
      .returning({ id: favorite.id });

    if (!deletedFavorite) {
      throw new Error("FAVORITE_NOT_FOUND");
    }

    return { data: deletedFavorite, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
    };
  }
}
