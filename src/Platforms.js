import React, {useState, useRef} from 'react';
import { View, Text, Modal, Pressable, Animated, Dimensions, Easing} from 'react-native';
import ButtonList from './ButtonList';
import ButtonSelectedItem from './ButtonSelectedItem';
import MainButton from './MainButton';
import styles from './Platforms.screen.style';
import BottomDrawer from './BottomDrawer';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


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

      /* draggable stuff */
      const velocityPercentForFling = 0.05;
      const windowHeight = Dimensions.get('window').height;
      //const animateYOffset = useRef(new Animated.Value(0)).current;
      const dragY = useRef(new Animated.Value(0)).current;
      //const positionY = Animated.add(animateYOffset, dragY);

      const panHandler = (      
        Animated.event(
            [
                {
                    nativeEvent: {
                        translationY:dragY
                    }
                }
            ], 
            {useNativeDriver:true}
        )
    );

    const findNearestSnap = (currentPosition, snaps) => {
      // get whichever snap point is nearest to the current position
      return snaps.reduce((nearest, snap) => {
          let thisSnapDelta = Math.abs(snap - currentPosition);
          let currentMinDelta = Math.abs(nearest - currentPosition);
          return (thisSnapDelta < currentMinDelta) ? snap : nearest;
      });
    }

    const animateSnap = (animatedValue, end) => {
      Animated.spring(animatedValue, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          toValue: end,
          useNativeDriver:true,
      }).start();
    };

    const stateChangeHandler = ({nativeEvent}) => {

      if (nativeEvent.oldState === State.ACTIVE){

          // panhandler has stopped - ease to the nearest snap point, taking into account speed of drag
          let currentPosition = nativeEvent.translationY + velocityPercentForFling * nativeEvent.velocityY;
          let snapTo = findNearestSnap(currentPosition, [windowHeight,0]);

            //animateYOffset.extractOffset();
            //animateYOffset.setValue(nativeEvent.translationY);
            //animateYOffset.flattenOffset();
            //dragY.setValue(0);
          
          if (snapTo == windowHeight){
            setModalVisible(false);
            animateSnap(dragY, 0);
          } else{
            animateSnap(dragY,0);
          }
      }
      
  };

    /* draggable end */

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
              <View style={styles.container}>
                <View style={styles.modalWrapper}>
                  <PanGestureHandler onGestureEvent={panHandler} onHandlerStateChange={stateChangeHandler}>
                    <Animated.View style={[styles.modalView, { transform:[{translateY : dragY}]}]}>
                      <View style={styles.modalHeader}>
                        <View style={styles.modalHandle}></View>
                      </View>
                      <View style={styles.modalBody}>
                        <ButtonList items={platforms} textProp="name" valueProp="id" keyProp="id" onButtonPressed={platformSelected}/>
                        {/*<Pressable
                              style={styles.cancelButton}
                              onPress={() => setModalVisible(!modalVisible)}
                              >
                          <Text style={styles.cancelButtonText}>X</Text>
                        </Pressable>   */}
                      </View> 
                    </Animated.View> 
                  </PanGestureHandler>
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