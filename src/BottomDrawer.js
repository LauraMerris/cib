import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing} from 'react-native';
import { PanGestureHandler, State} from 'react-native-gesture-handler';

export default function BottomDrawer({min, max, children, visible, handleClose}) {
    const styles = StyleSheet.create({
        drawerStyle: {
          borderRadius:30,
          left:0,
          right:0,
          top:0,
          bottom:0,
          position:'absolute',
          backgroundColor:'darkkhaki',
          padding:40,
          paddingTop:80,
        },
        scrollContainer:{
            flex:1,
        },
        handle:{
            padding:4,
            borderRadius:4,
            backgroundColor:'darkgoldenrod',
            position:'relative',
            top:-60,
            width:"30%",
            alignSelf:"center"
        }
    });

    const windowHeight = Dimensions.get('window').height;
    const snapMin = windowHeight * min;
    const snapMax = windowHeight * max;
    const snapPoints = [snapMax, snapMin];

    const velocityPercentForFling = 0.05;
    const startSnapPoint = snapMax;

    const dragY = useRef(new Animated.Value(0)).current;
    const lastSnap = useRef(snapMin);
    const CURRENTMARGIN = snapMax;
    const animateYOffset = useRef(new Animated.Value(snapMin)).current;
    
    // clamps drawer to top position
    const positionY = Animated.add(animateYOffset, dragY).interpolate({
        inputRange: [snapMax, snapMin],
        outputRange: [snapMax, snapMin],
        extrapolate: 'clamp'});

    const findNearestSnap = (currentPosition, snaps) => {
        // get whichever snap point is nearest to the current position
        return snaps.reduce((nearest, snap) => {
            let thisSnapDelta = Math.abs(snap - currentPosition);
            let currentMinDelta = Math.abs(nearest - currentPosition);
            return (thisSnapDelta < currentMinDelta) ? snap : nearest;
        });
    }

    // this mutates the value of animatedValue and animates it with final value of 'end'
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
            let currentPosition = lastSnap.current + nativeEvent.translationY + velocityPercentForFling * nativeEvent.velocityY;
            let snapTo = findNearestSnap(currentPosition, snapPoints);
            if (snapTo == snapMin){
                console.log('min snap point');
                handleClose();
            }
            // set animateYOffset as the current position after drag
            animateYOffset.extractOffset();
            animateYOffset.setValue(nativeEvent.translationY);
            animateYOffset.flattenOffset();
            dragY.setValue(0);
            lastSnap.current = snapTo;
            animateSnap(animateYOffset, snapTo);
        }
    };
    
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

    useEffect(() => {
        if (visible){
            lastSnap.current = startSnapPoint;
            animateSnap(animateYOffset, lastSnap.current);
        }
    }, [visible]);
    
    return (
        <PanGestureHandler onGestureEvent={panHandler} onHandlerStateChange={stateChangeHandler}>
            <Animated.View style={[styles.drawerStyle, { transform:[{translateY : positionY}]}]}>
            <View style={styles.handle}></View>
                <View style={[styles.scrollContainer, {marginBottom:CURRENTMARGIN}]}>
                 {children}
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
        
}