import React from 'react';
import {View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {sortByLookup} from './Utilities';
import styles from './Regions.screen.style';
import { FlatList } from 'react-native-gesture-handler';

const Regions = ({releases, currentRegion, onChange}) => {
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'};
    const data = releases.sort(sortByLookup("region", regionMap));

    const handleChange = (region) => {

        // is active
        (region === currentRegion) ? onChange(null) : onChange(region)

        // or if it's on just turn it off and pass null to onChange
    }

    const renderItem = ({ item }) => ( 
            <View style={[styles.toggleButton, currentRegion == item.region ? styles.toggleButtonActive : styles.toggleButtonInactive]}>
                <TouchableOpacity onPress={() => handleChange(item.region)}>
                    <Text style={styles.toggleButtonText}>{regionMap[item.region]}</Text>
                    <Text style={styles.toggleButtonText}>{item.y}</Text>
                </TouchableOpacity>
            </View>
        
    );

    // assuming here that region only ever appears once - possibly incorrect and need compound key
    return (
    <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.region}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}>
    </FlatList>
    )
    
};

export default Regions;