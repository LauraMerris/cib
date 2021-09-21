import React from 'react';
import {View,Text} from 'react-native';
import MainButton from './MainButton';
import {sortAlphabetically} from './Utilities';
import {Picker} from '@react-native-picker/picker';

const Platforms = ({platforms, selectedItem, onChange}) => {
        /*
    return <View>
      <Picker 
        itemStyle={{color:'#fff'}}
        selectedValue={selectedItem}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        <Picker.Item key="0" label="Select a platform" value="0"/>
        {platforms.sort(sortAlphabetically("name")).map(item => <Picker.Item key={item.id} label={item.name} value={item.id}/>)}
      </Picker>
    </View>
    */
    return <View>
       {(selectedItem) ? <Text>Platform Here (edit)</Text> : <MainButton buttonText="Select a Platform"/>}
    </View>
};

export default Platforms;