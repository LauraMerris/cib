import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {auth} from './firebaseConnect.js';
import {createUserWithEmailAndPassword} from 'firebase/auth';


export default function RegisterScreen({navigation}){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //const user = userCredential.user;
            //console.log(userCredential.user);
        }
        catch (error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(errorMessage);
        }
    };

    //const emailOnlySignIn = async () => {
    //};

    return(
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoid}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    style={styles.keyboardAvoid}>
                    <View style={styles.inner}>
                    <Text style={styles.heroText}>Start collecting now...</Text>
         
                        <TextInput 
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}/>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry />
                        <TouchableOpacity
                            onPress={signUp}
                            style={[styles.buttonMain]}>
                                <Text style={styles.buttonMainText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
}

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
    heroText:{
        color:'#ffffff',
        fontSize:40,
        marginBottom:30,
    },
    heading:{
        color:'#ffffff',
        fontSize:30,
        marginBottom:10,
    },
    inner: {
        padding:60,
        paddingTop:0,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
    input: {
        marginBottom: 10,    
        alignSelf:'stretch',
        height: 50, 
        borderRadius:10,
        backgroundColor:'#fff',
        fontSize: 24,
        borderWidth:1,
        paddingHorizontal:10,
    },
    buttonMain: {
        paddingHorizontal:10,
        paddingVertical:16,
        borderRadius:10,
        backgroundColor:'#c0efe0',
        color:'#393939',
        marginBottom:24,
        textAlign:"center",
        marginTop:20,
        marginHorizontal:30,
        alignSelf:'stretch',
    },
    buttonMainText:{
        fontSize:24,
        textAlign:"center"
    },
})
