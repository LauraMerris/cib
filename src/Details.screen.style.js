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
    toggleButton:{
        color:'#fff',
        backgroundColor:'#c0efe0',
        padding:10,
        margin:10,
    },
    toggleButtonBlue:{
        color:'#000',
        backgroundColor:'#fff',
        padding:10,
        margin:10,
    }
  });

  export default styles;
  