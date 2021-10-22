import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native';
import Platforms from './Platforms';
import Regions from './Regions';
import MainButton from './MainButton';
import {clientID, bearer} from './config.js';
import styles from './Details.screen.style';

export default function DetailsScreen({route,navigation}){

    const [gameDetails, setGameDetails] = useState(null);
    const [gameID, setGameID] = useState(route.params.id);
    const [platform, setPlatform] = useState(null);
    const [region, setRegion] = useState(null);
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'}
    const fetchGame = async (searchTerm) => {
      //syntax note, in an arrow function ( multiple lines of stuff ) is equivalent to return { multiple lines of stuff }

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
        <View style={styles.container}>
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