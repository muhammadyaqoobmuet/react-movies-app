import { Client, Databases, ID, Query } from "appwrite";
import { configFile } from "./config/config";
import { Movie } from "./components/MoviesList";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(configFile.projectId);

const database = new Databases(client);

export const updateSearch = async (searchTerm: string, movie: Movie) => {
  try {
    const results = await database.listDocuments(
      configFile.dataBaseId,
      configFile.collectionId,
      [Query.equal("searchTerm", searchTerm)]
    );

    if (results.documents.length > 0) {
      const doc = results.documents[0];
      await database.updateDocument(
        configFile.dataBaseId,
        configFile.collectionId,
        doc.$id,
        {
          count: doc.count + 1,
        }
      );
    } else {
      await database.createDocument(
        configFile.dataBaseId,
        configFile.collectionId,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("error occured");
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(
      configFile.dataBaseId,
      configFile.collectionId,
      [Query.limit(5), Query.orderDesc("count")]
    );

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};
