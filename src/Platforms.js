import React, {useState} from 'react';
import {View, Text, Modal, Pressable, Button} from 'react-native';
import ButtonList from './ButtonList';
import MainButton from './MainButton';
import styles from './Platforms.screen.style'
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
    const [modalVisible, setModalVisible] = useState(false);
    return <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ButtonList style={styles.modalText} items={platforms} textProp="name" valueProp="id" keyProp="id"/>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
       {(selectedItem) ? <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}><Text>Platform Here (edit)</Text></Pressable> : 
        <MainButton buttonText="Select a platform" onButtonPress={() => setModalVisible(true)} />
       }
    </View>
};

export default Platforms;