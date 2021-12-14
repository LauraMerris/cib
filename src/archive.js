
    /*
    const fetchGames = async (searchTerm, platformID) => {

      const whereSearch = platformID ? `where platforms = (${platformID});` : '';

      // clean searchTerm here
      const text = `fields name,
        alternative_names.name,
        platforms.name,
        version_parent,
        release_dates.game.name,
        release_dates.platform.name,
        release_dates.region,
        release_dates.date,
        version_title;
        limit ${limit};
        search "${searchTerm}";
        ${whereSearch};`

      const request = new Request(`https://api.igdb.com/v4/games`, {
        method: "POST",
        headers:{
          "Client-ID": clientID,
          "Authorization":`Bearer ${bearer}`,
        },
        body:text
      });

      try{
        setIsLoading(true);
        
        const apiCall = await fetch(request);
        const games = await apiCall.json();
        setIsLoading(false);
  
        // save to useState
        setGames(games);
  
      } catch (error){
        console.log(error);
      }
    }
    */

    /*
    const fetchPlatforms = async () => {
      const text = `fields name, generation; where category= (1,5,6); limit 200;`;
      const request = new Request(`https://api.igdb.com/v4/platforms`, {
        method: "POST",
        headers:{
          "Accept":"application/json",
          "Client-ID": clientID,
          "Authorization":`Bearer ${bearer}`,
        },
        body:text
      });

      try {
        const apiCall = await fetch(request);
        const retrievedPlatforms = await apiCall.json();
        console.log(retrievedPlatforms);

        // filter out all non-generation platforms before sorting numerically, otherwise the sort will not work
        //const filterGeneration = retrievedPlatforms.filter((item => 'generation' in item)).sort((a,b) => b.generation - a.generation);
        setAvailablePlatforms(retrievedPlatforms.sort(sortAlphabetically('name')));

      } catch(error) {

      }
    }
    */