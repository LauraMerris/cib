import React, {useState, useRef} from 'react';
import { View, Text, Modal, Pressable, Animated } from 'react-native';
import { onChange } from 'react-native-reanimated';
import ButtonList from './ButtonList';
import ButtonSelectedItem from './ButtonSelectedItem';
import MainButton from './MainButton';
import styles from './Platforms.screen.style';
import BottomDrawer from './BottomDrawer';


    const Platforms = ({platforms, selectedPlatformID, onChange}) => {

      const [modalVisible, setModalVisible] = useState(false);
      const animateY = useRef(new Animated.Value(0)).current;

      let selectedItem = [];

      if (selectedPlatformID) {
        selectedItem = platforms.filter((item) => item.id == selectedPlatformID);
      }

      const platformSelected = (ID) => {
        setModalVisible(false);
        onChange(ID);
      };

      return (
        <View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}
            > 
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(!modalVisible)}
                      >
                  <Text style={styles.cancelButtonText}>X</Text>
                </Pressable>
                <ButtonList items={platforms} textProp="name" valueProp="id" keyProp="id" onButtonPressed={platformSelected}/>
              </View>
            </View>
            </Modal>
            {(selectedItem.length) ? 
            <ButtonSelectedItem buttonText={selectedItem[0].name} onButtonPress={() => setModalVisible(true)}/> : 
            <MainButton buttonText="Select a platform" onButtonPress={() => setModalVisible(true)} />
            }
        </View>
      )
};

export default Platforms;