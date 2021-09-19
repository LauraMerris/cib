import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Platforms from './Platforms';
import Regions from './Regions';
import {clientID, bearer} from './config.js';
import styles from './Details.screen.style';

export default function DetailsScreen({route,navigation}){

    const [gameDetails, setGameDetails] = useState(null);
    const [gameID, setGameID] = useState(route.params.id);
    const [platform, setPlatform] = useState(null);
    const [region, setRegion] = useState(0);
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'}
    const fetchGame = async (searchTerm) => {
      //syntax note ( multiple lines of stuff ) is equivalent to return { multiple lines of stuff }

        // clean searchTerm here
        const text = `fields name,
        id,
        platforms.name,
        release_dates.game.name,
        release_dates.platform.name,
        release_dates.region,
        release_dates.y,
        version_title;
        where id=${searchTerm};`;
        const request = new Request(`https://api.igdb.com/v4/games`, {
          method: "POST",
          headers:{
            "Client-ID": clientID,
            "Authorization":`Bearer ${bearer}`,
          },
          body:text
        });
  
        try{  
          const apiCall = await fetch(request);
          const game = await apiCall.json();
          setGameDetails(game[0]);
        } catch (error){
          console.log(error);
        }
    }

    // think this doesn't need to be an effect, as change in params triggers a re-render anyway
    // what's the alternative?

    useEffect(() => {
        fetchGame(gameID)
    },[gameID]);

    /*
    useEffect(() => {
      if (gameDetails && gameDetails.release_dates) {
        let filterReleases = gameDetails.release_dates.filter(release => release.platform.id === platform);
        if (!filterReleases.some(release => release.region === region)) {
          setRegion(0);
        }
      }
    }, [platform])
    */
    
    const handlePlatformChange = (value) => {
      setPlatform(value);

      // if this makes the current region selection invalid - clear the region
      let filterReleases = gameDetails.release_dates.filter(release => release.platform.id === value);
        //if (!filterReleases.some(release => release.region === region)) {
        //  setRegion(0);
        //}
        setRegion(0);
    }

    
    return (gameDetails ?
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.mainHeading}>{gameDetails.name}</Text>
          <Text style={styles.image}>Image goes here</Text>
          <Text style={styles.title}>You selected {platform} and {regionMap[region]}</Text>
          {gameDetails.platforms &&
            <Platforms platforms={gameDetails.platforms} selectedItem={platform} onChange={handlePlatformChange} />
          }
          { gameDetails.release_dates &&
            <Regions releases={gameDetails.release_dates.filter(release => release.platform.id == platform)} currentRegion={region} onChange={setRegion} />
          }        
        </ScrollView>
      </View> : <View><Text>Loading...</Text></View>
    )


  }