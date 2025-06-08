type Config = {
  header: string;
  dataBaseId: string;
  collectionId: string;
  projectId: string;
};


export const configFile: Config = {
  header: import.meta.env.VITE_TMDB_API_KEY || "",
  dataBaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID || "",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
  collectionId:
    import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_COLLECTION_ID || "",
};

// Check for missing values
const missingVars = [];
if (!configFile.header) missingVars.push("VITE_TMDB_API_KEY");
if (!configFile.dataBaseId)
  missingVars.push("VITE_APPWRITE_PROJECT_DATABASE_ID");
if (!configFile.projectId) missingVars.push("VITE_APPWRITE_PROJECT_ID");
if (!configFile.collectionId)
  missingVars.push("VITE_APPWRITE_PROJECT_DATABASE_COLLECTION_ID");

if (missingVars.length > 0) {
  console.error("Missing environment variables:", missingVars);
  throw new Error(
    `Missing configuration values: ${missingVars.join(
      ", "
    )}. Please check your .env file.`
  );
}
