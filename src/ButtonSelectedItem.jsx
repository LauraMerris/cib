import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './ButtonSelectedItem.component.style';

const ButtonSelectedItem = ({buttonText, onButtonPress}) => {
    return (
        <Pressable style={styles.selectedPlatform} onPress={onButtonPress}>
            <Text style={styles.selectedPlatformText}>{buttonText} (edit)</Text>
        </Pressable>
    )
};

export default ButtonSelectedItem;