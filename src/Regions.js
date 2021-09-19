import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {sortByLookup} from './Utilities';
import styles from './Details.screen.style';

const Regions = ({releases, currentRegion, onChange}) => {
    const regionMap = {1:'Europe',2:'North America',3:'Australia',4:'New Zealand',5:'Japan',6:'China',7:'Asia',8:'Worldwide'};
    return releases.sort(sortByLookup("region", regionMap)).map(item =>
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
      )
};

export default Regions;