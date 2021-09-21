import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, View, FlatList, Button } from 'react-native';
import MainButton from './MainButton';
import styles from './Home.screen.style';

export default function HomeScreen({navigation}){
    const [games, setGames] = useState(null);
    const [page, setPage] = useState(1); 
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    let searchText = '';
    const limit = 20;
    let offset = 0;
    
    const fetchGames = async (searchTerm) => {

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
        search "${searchTerm}";`;
      const request = new Request(`https://api.igdb.com/v4/games`, {
        method: "POST",
        headers:{
          "Client-ID": "46fyrld7q2dusipj65jqqcpco8zwj1",
          "Authorization":"Bearer ybu2h4d02jkcmn6p2b3lcyiew0jc57",
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
    
    useEffect(() => {
      fetchGames(searchTerm);
    },[searchTerm])

    const viewDetails = (id) => {
      navigation.navigate("Details");
    }

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
            <MainButton buttonText="Platform"/>
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

  
  
