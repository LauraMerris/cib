import React from 'react';
import {View} from 'react-native';
import {sortAlphabetically} from './Utilities';
import {Picker} from '@react-native-picker/picker';

const Platforms = ({platforms, selectedItem, onChange}) => {
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
};

export default Platforms;