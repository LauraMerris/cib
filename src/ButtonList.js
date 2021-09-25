import React from 'react';
import {View, FlatList,} from 'react-native';
import styles from './ButtonList.component.style';
import MainButton from './MainButton';

const ButtonList = ({items, textProp, valueProp, keyProp, onButtonPressed}) => {

    const renderItem = ({item}) => ( 
       <MainButton buttonText={item[textProp]} onButtonPress={() => onButtonPressed(item.id.toString())}/>
    );

    return(
      <View>
          <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item[keyProp].toString()}
                />
      </View>
    )
};

export default ButtonList;