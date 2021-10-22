import React from 'react';
import {View, FlatList,} from 'react-native';
import MainButton from './MainButton';

const ButtonList = ({items, textProp, keyProp, onButtonPressed}) => {

    const renderItem = ({item}) => ( 
       <MainButton buttonText={item[textProp]} onButtonPress={() => onButtonPressed(item.id.toString())}/>
    );

    return(
      <View style={{flex:1}}>
          <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item[keyProp].toString()}
                />
      </View>
    )
};

export default ButtonList;