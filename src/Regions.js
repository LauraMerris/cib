import React from 'react';
import {View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {sortByLookup} from './Utilities';
import styles from './Details.screen.style';
import { FlatList } from 'react-native-gesture-handler';

const Regions = ({releases, currentRegion, onChange}) => {
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'};
    const data = releases.sort(sortByLookup("region", regionMap));

    const handleChange = (region) => {
        onChange(region);

        // or if it's on just turn it off and pass null to onChange
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChange(item.region)}>
            <View style={currentRegion == item.region ? styles.toggleButtonBlue : styles.toggleButton}>
                <Text>{regionMap[item.region]}</Text>
                <Text>{item.y}</Text>
            </View>
        </TouchableOpacity>
    );

    // assuming here that region only ever appears once - possibly incorrect and need compound key
    return (
    <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.region}
        numColumns={3}>

    </FlatList>
    )
    /*
        <TouchableWithoutFeedback 
            key= {item.id}
            value={item.region}
            onPress={() => onChange(item.region)}
        >
          <View style={currentRegion == item.region ? styles.toggleButtonBlue : styles.toggleButton}>
            <Text>{regionMap[item.region]}</Text>
            <Text>{item.y}</Text>
          </View>
        </TouchableWithoutFeedback>
      ); */
    
};

export default Regions;