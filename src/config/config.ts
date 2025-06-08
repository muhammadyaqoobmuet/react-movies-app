type Config = {
  header: string;
  dataBaseId: string;
  collectionId: string;
  projectId: string;
};

export const configFile: Config = {
  // Fixed: TMBD_API_KEY -> VITE_TMDB_API_KEY (needs VITE_ prefix)
  header: import.meta.env.VITE_TMDB_API_KEY,
  dataBaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  collectionId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_COLLECTION_ID,
};
  