import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2b2b2b',
      color:'#fff',
      padding:0,
      paddingTop:0,
      flex:1
    },
    scrollContainer: {
      padding:25,
    },
    loading: {
        color:'#fff',
    },
    mainHeading:{
        fontSize:36,
        padding:32,
        color:'#fff',
        alignSelf:'center',
        textAlign:'center',
    },
    list: {
      backgroundColor:'#2b2b2b',
      padding:32,
      paddingVertical:16,
    },
    title: {
        fontSize: 18,
        color:'#fff',
      },
    image: {
        width:120,
        height:150,
        backgroundColor:'#fff',
        alignSelf:'center',
        padding:20,
        margin:20,
    },
    toggleButtonInactive:{
        backgroundColor:'#c0efe0',
        color:'#fff',
    },
    toggleButtonActive:{
        color:'#000',
        backgroundColor:'#fff',
        
    },
    toggleButton: {
      flex:0.3,
      padding:0,
      marginVertical:10,
      paddingVertical:10,
    },
    toggleButtonText:{
      textAlign:'center',
    }
  });

  export default styles;
  