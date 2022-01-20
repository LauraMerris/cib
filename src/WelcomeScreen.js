import { signOut } from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import {auth} from './firebaseConnect.js';

const Welcome = ({navigation}) => {

    const [user, setUser] = useState();

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(undefined);
        } catch(error) {
            console.log(error.message);
        }
    }

    function LoggedInContent(){
        return <View>
            <Text style={styles.heroText}>Account</Text>
            <Text style={styles.text}>You are signed in as:</Text>
            <Text style={styles.text}>{user? user.email:''}</Text>
            <TouchableOpacity
                onPress={logout}
                style={styles.buttonSecondary}>
                <Text style={styles.buttonMainText}>Log out</Text>
            </TouchableOpacity>
        </View>
    }

    useFocusEffect(
        React.useCallback(() => {
            const authenticatedUser = auth.currentUser;
            setUser(authenticatedUser);
        },[user])
    );

    return (
        <LoggedInContent/>
    )
}

export default Welcome;

const styles = StyleSheet.create({
        container: {
            backgroundColor: '#2b2b2b',
            padding:0,
            paddingTop:0,
            flex:1,
            alignItems:'center',
            justifyContent:'center',
          },
        keyboardAvoid:{
            flex:1,
            alignSelf:'stretch',
        },
        heading:{
            color:'#ffffff',
            fontSize:30,
            marginBottom:10,
        },
        heroText:{
            color:'#ffffff',
            fontSize:40,
            marginBottom:30,
        },
        text:{
            color:'#ffffff',
            fontSize:20,
            marginBottom:20
        },
        buttonSecondary: {
            paddingHorizontal:10,
            paddingVertical:16,
            borderRadius:10,
            backgroundColor:'#ffffff',
            color:'#393939',
            marginBottom:24,
            textAlign:"center",
            marginTop:20,
            marginHorizontal:30,
            alignSelf:'stretch',
            marginTop:40,
        },
        buttonMainText:{
            fontSize:24,
            textAlign:"center"
        },
})
