import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {auth} from './firebaseConnect.js';
import {signInWithEmailAndPassword} from 'firebase/auth';


export default function Login({navigation}){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const signUp = async () => {

        if (email== '' || password=='') return;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error){
            setError(errorMessage);
        }
    };

    useEffect(() => {
        setError('');
    },[])

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
                    <Text style={styles.separate}>{error}</Text>
                    <Text style={styles.heroText}>Login</Text>
                        <TextInput 
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                            secureTextEntry={false}
                            />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry />
                        <TouchableOpacity
                            onPress={signUp}
                            style={[styles.buttonMain]}>
                                <Text style={styles.buttonMainText}>Login</Text>
                        </TouchableOpacity>
                        <Text style={styles.separate}>Not registered yet?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                            style={[styles.buttonSecondary]}>
                                <Text style={styles.buttonMainText}>Create Account</Text>
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
    separate:{
        color:'#ffffff',
        fontSize:20,
        marginTop:40
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
    },
    buttonMainText:{
        fontSize:24,
        textAlign:"center"
    },
})
