import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './MainButton.screen.style';

const MainButton = ({buttonText}) => {
        return <TouchableOpacity>
            <View style={styles.buttonMain}>
                <Text style={styles.buttonMainText}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
};

export default MainButton;