import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const SplashScreen = () => {
    return (
        <>
             <Text style={styles.heroText}>Nearly there...</Text>
        </>
    )
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2b2b2b',
        padding:0,
        paddingTop:0,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        },
        heroText:{
            color:'#ffffff',
            fontSize:40,
            marginBottom:30,
        },
});
