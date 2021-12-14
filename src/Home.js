import React, {useEffect, useState} from 'react';
import { Text, TouchableWithoutFeedback, TextInput, View, FlatList, Button, SafeAreaView } from 'react-native';
import Platforms from './Platforms';
import styles from './Home.screen.style';
import { sortAlphabetically, sortNumerically } from './Utilities';
import * as Api from './crud.js';

export default function HomeScreen({navigation}){
    const [games, setGames] = useState(null);
    const [page, setPage] = useState(1); 
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [platform, setPlatform] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    let searchText = '';
    const limit = 20;

    const getGames = async (searchTerm, platformID) => {
      try{
        setIsLoading(true);
        const games = await Api.getGames(searchTerm, platformID)
        setIsLoading(false);
        setGames(games);
      } catch(error){
          console.error(error);
          setIsLoading(false);
      }

    };

    const getPlatforms = async () => {
      try {
        const platforms = await Api.getPlatforms('');
        const sortNameAscending = sortAlphabetically('name');
        setAvailablePlatforms(platforms.sort(sortNameAscending));
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getPlatforms();
    }, []);
    
    useEffect(() => {
      // new search needed when platform filter is changed, or a new search term is used
      getGames(searchTerm, platform);
    },[searchTerm, platform]);

    // returns comma separated list of platforms from an array - move to utility function
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
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Platforms platforms={availablePlatforms} selectedPlatformID={platform} onChange={setPlatform}/>
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
        </SafeAreaView>
      )
    }

    return (
      <Games />
    )
  }

  
  
