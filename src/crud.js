import { fetchPlats, fetchGames, fetchGame } from './firebaseConnect';

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

export const getGame = async (searchTerm) => {
  try{
    const game = await fetchGame({searchTerm: searchTerm});
    return game.data[0];
  } catch(error){
    throw error;
  }
}