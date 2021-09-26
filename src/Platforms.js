import React, {useState, useEffect} from 'react';
import {View, Text, Modal, Pressable, Button} from 'react-native';
import ButtonList from './ButtonList';
import ButtonSelectedItem from './ButtonSelectedItem';
import MainButton from './MainButton';
import styles from './Platforms.screen.style'

    const Platforms = ({platforms, selectedPlatformID, onChange}) => {

      const [modalVisible, setModalVisible] = useState(false);
      //const [selected, setSelected] = useState(null);

      let selectedItem = [];

      if (selectedPlatformID) {
        selectedItem = platforms.filter((item) => item.id == selectedPlatformID);
      }

      const platformSelected = (ID) => {
        setModalVisible(false);
        onChange(ID);
      };

      return <View>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <ButtonList items={platforms} textProp="name" valueProp="id" keyProp="id" onButtonPressed={platformSelected}/>
                      <Pressable
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>
          {(selectedItem.length) ? 
          <ButtonSelectedItem buttonText={selectedItem[0].name} onButtonPress={() => setModalVisible(true)}/> : 
          <MainButton buttonText="Select a platform" onButtonPress={() => setModalVisible(true)} />
          }
        
      </View>
};

export default Platforms;