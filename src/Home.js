import React, {useEffect, useState} from 'react';
import { Text, TouchableWithoutFeedback, TextInput, View, FlatList, Button } from 'react-native';
import Platforms from './Platforms';
import styles from './Home.screen.style';
import { sortAlphabetically, sortNumerically } from './Utilities';
import {clientID, bearer} from './config.js';

export default function HomeScreen({navigation}){
    const [games, setGames] = useState(null);
    const [page, setPage] = useState(1); 
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [platform, setPlatform] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    let searchText = '';
    const limit = 20;
    let offset = 0;

    
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
        console.log(games);
  
      } catch (error){
        console.log(error);
      }
    }

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

        // filter out all non-generation platforms before sorting numerically, otherwise the sort will not work
        //const filterGeneration = retrievedPlatforms.filter((item => 'generation' in item)).sort((a,b) => b.generation - a.generation);

        setAvailablePlatforms(retrievedPlatforms.sort(sortAlphabetically('name')));

      } catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      // get available platforms just the first time the component is loaded
      fetchPlatforms();
    }, []);
    
    useEffect(() => {
      fetchGames(searchTerm, platform);
      // changing to include platform select
    },[searchTerm, platform]);

    // returns comma separated list of platforms from an arry - move to utility function
    const platforms = (platforms) => {
      if (!platforms) {
        return '';
      }
      let str = '';
      return platforms.map(platform => platform.name).join(', ');
    };
  
    const renderItem = ({item}) => ( 

      <TouchableWithoutFeedback style={styles.item} onPress={() => navigation.navigate("Details", {id: item.id.toString()})}>
        <View style={styles.item}>
          <Text style={styles.itemID}>{item.id}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.platforms}>{platforms(item.platforms)}</Text>
        </View>
       </TouchableWithoutFeedback>
      
    );

    const onChangeText = (text) => {
      searchText = text;
    }

    const Games = () => {

      let pageIsFirst = page == 1;

      return (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Platforms platforms={availablePlatforms} selectedPlatform={platform} onChange={setPlatform}/>
            <TextInput style={styles.search} placeholder="Search" defaultValue={searchTerm} onChangeText={text => onChangeText(text)} returnKeyType="search" onSubmitEditing={() => setSearchTerm(searchText)}></TextInput>
          </View>
          <View style={styles.list}>
            {isLoading ? <View><Text style={styles.loading}>Loading...</Text></View> :
              <FlatList
              data={games}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              />
            }
          </View>
        </View>
      )
    }

    return (
      <Games />
    )
  }

  
  
