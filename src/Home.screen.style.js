import {StyleSheet} from 'react-native';
import { block } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2b2b2b',
      padding:0,
      paddingTop:0,
      flex:1
    },
    search: {
      height: 60, 
      borderRadius:10,
      backgroundColor:'#fff',
      fontSize: 24,
      borderWidth:1,
      paddingHorizontal:10,
    },
    searchContainer: {
      flex:1,
      backgroundColor: "#393939",
      padding: 32,
      margin:0,
    },
    buttonMain: {
      paddingHorizontal:10,
      paddingVertical:16,
      borderRadius:10,
      backgroundColor:'#c0efe0',
      color:'#393939',
      marginBottom:24,
      textAlign:"center",
    },
    buttonMainText:{
      fontSize:24,
      textAlign:"center"
    },
    list: {
      flex:3,
      backgroundColor:'#2b2b2b',
      padding:32,
      paddingVertical:16,
    },
    item: {
      paddingVertical: 24,
    },
    itemID: {
      color:'#fff',
    },
    title: {
      fontSize: 18,
      color:'#fff'
    },
    platforms: {
      color:'#fff',
    },
    loading: {
      color:'#fff',
    }
  });

  export default styles;
  