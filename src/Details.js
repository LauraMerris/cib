import React, {useEffect, useState} from 'react';
import { Text, View, } from 'react-native';
import Platforms from './Platforms';
import Regions from './Regions';
import MainButton from './MainButton';
import styles from './Details.screen.style';
import * as Api from './crud.js';

export default function DetailsScreen({route,navigation}){

    const [gameDetails, setGameDetails] = useState(null);
    const [gameID, setGameID] = useState(route.params.id);
    const [platform, setPlatform] = useState(null);
    const [region, setRegion] = useState(null);
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'}



    const fetchGame = async (searchTerm) => {
      console.log(gameID);
      try{
        const game = await Api.getGame(searchTerm);
        setGameDetails(game);
      } catch(error){
          console.error(error);
      }

    };
    

    // think this doesn't need to be an effect, as change in params triggers a re-render anyway
    // what's the alternative - UseRef ?
    // should change on route change - won't update otherwise even if gameID changes.

    useEffect(() => {
        fetchGame(gameID)
    },[gameID]);
    
    const handlePlatformChange = (value) => {
      if (value != platform){
        // clear region selection on platform change
        setRegion(0);
      }
      setPlatform(value);
    }

    
    return (gameDetails ?
        <View>
            <Text style={styles.mainHeading}>{gameDetails.name}</Text>
            <Text style={styles.image}>Image goes here</Text> 
            {/* <Text style={styles.title}>You selected {platform} and {regionMap[region]}</Text> */}
            {gameDetails.platforms && 
              <Platforms platforms={gameDetails.platforms} selectedPlatformID={platform} onChange={handlePlatformChange} />
            }
            { gameDetails.release_dates &&
              <Regions releases={gameDetails.release_dates.filter(release => release.platform.id == platform)} currentRegion={region} onChange={setRegion} />
            }     
            <View>
              <MainButton buttonText="Add to collection" />
            </View> 
        </View>
       : <View><Text style={styles.loading}>Loading...</Text></View>
    )

  }