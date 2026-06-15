import { useAuthTables } from "./auth.schema";
import { useFavoritesTable } from "./favorites.schema";

export const { account, accountRelations, session, sessionRelations, user, userRelations, verification } =
  useAuthTables();

export const { favorite } = useFavoritesTable();
