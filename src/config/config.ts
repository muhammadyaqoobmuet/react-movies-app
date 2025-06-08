type Config = {
  header: string | undefined;
  dataBaseId: string;
  collectionId: string;
  projectId: string;
};

export const configFile: Config = {
  header: import.meta.env.TMBD_API_KEY,
  dataBaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  collectionId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_COLLECTION_ID,
};
