import React, {useState} from 'react';
import {View, Text, Modal, Pressable, Button} from 'react-native';
import ButtonList from './ButtonList';
import MainButton from './MainButton';
import styles from './Platforms.screen.style'

    const Platforms = ({platforms, selectedItem, onChange}) => {

      const [modalVisible, setModalVisible] = useState(false);
      
      const selected = platforms.filter((item) => item.id == selectedItem);

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
        {(selected.length) ? <Pressable style={[styles.selectedPlatform]} onPress={() => setModalVisible(true)}><Text style={styles.selectedPlatformText}>{selected[0].name} (edit)</Text></Pressable> : 
          <MainButton buttonText="Select a platform" onButtonPress={() => setModalVisible(true)} />
        }
      </View>
};

export default Platforms;