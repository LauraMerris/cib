import { fetchPlats, fetchGames } from './firebaseConnect';

export const getGames = async (searchTerm, platformID) => {
    try{
      const games = await fetchGames({platformID: platformID, searchTerm: searchTerm});
      return games.data;
    } catch(error){
        throw error;
    }

  }

  export const getPlatforms = async () => {
      try{
        const platforms = await fetchPlats('');
        return platforms.data;
      } catch (error){
        throw error;
      }
    }