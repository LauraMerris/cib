import React from 'react';
import {View, Text, FlatList,TouchableWithoutFeedback} from 'react-native';
import styles from './ButtonList.component.style';

const ButtonList = ({items, textProp, valueProp, keyProp}) => {

    const renderItem = ({item}) => ( 
        <TouchableWithoutFeedback>
          <View>
            <Text>{item[textProp]}</Text>
            <Text>{item[valueProp]}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    return(
      <View>
          <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item[keyProp]}
                />
      </View>
    )
};

export default ButtonList;