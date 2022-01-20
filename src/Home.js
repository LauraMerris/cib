import React, {useEffect, useState} from 'react';
import { Text, TouchableWithoutFeedback, TextInput, View, FlatList, Button } from 'react-native';
import Platforms from './Platforms';
import styles from './Home.screen.style';
import { sortAlphabetically, sortNumerically } from './Utilities';
import * as Api from './crud.js';
import { logError } from './ErrorLogger';
import useThemedStyles from './useThemedStyles';

export default function HomeScreen({navigation}){
    const [games, setGames] = useState(null);
    const [page, setPage] = useState(1); 
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [platform, setPlatform] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    
    const style = useThemedStyles(styles);
    
    let searchText = '';
    const limit = 20;

    const getGames = async (searchTerm, platformID) => {
      try{
        setIsLoading(true);
        const games = await Api.getGames(searchTerm, platformID)
        setIsLoading(false);
        setGames(games);
      } catch(error){
          console.log('games loading error');
          console.log(error.stack);
          setIsLoading(false);
      }

    };

    /*
    const getPlatforms = async () => {
      try {
        const platforms = await Api.getPlatforms('');
        if (!platforms || !platforms.length) return;
        const sortNameAscending = sortAlphabetically('name');
        setAvailablePlatforms(platforms.sort(sortNameAscending));
      } catch (error) {
        console.error(error);
      }
    };
    */

    const getPlatforms = () => {
      Api.getPlatforms()
      .then(platforms => {
        if (!platforms || !platforms.length) {
          throw Error('no platforms found');
        };
        const sortNameAscending = sortAlphabetically('name');
        setAvailablePlatforms(platforms.sort(sortNameAscending));
      })
      .catch(error => {
        console.log('platforms loading error');
        console.log(error);
      });
    }


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
      <TouchableWithoutFeedback style={style.item} onPress={() => navigation.navigate("Details", {id: item.id.toString()})}>
        <View style={style.item}>
          <Text style={style.itemID}>{item.id}</Text>
          <Text style={style.title}>{item.name}</Text>
          <Text style={style.platforms}>{platforms(item.platforms)}</Text>
        </View>
       </TouchableWithoutFeedback>
    );

    const onChangeText = (text) => {
      searchText = text;
    }

    const Games = () => {

      return (
        <>
          <View style={style.searchContainer}>
            <Platforms platforms={availablePlatforms} selectedPlatformID={platform} onChange={setPlatform}/>
            <TextInput style={style.search} placeholder="Search" defaultValue={searchTerm} onChangeText={text => onChangeText(text)} returnKeyType="search" onSubmitEditing={() => setSearchTerm(searchText)}></TextInput>
          </View>
          <View style={style.list}>
            {isLoading ? <View><Text style={style.loading}>Loading...</Text></View> :
              <FlatList
              data={games}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              />
            }
          </View>
        </>
      )
    }

    return (
      <Games />
    )
  }

  
  
