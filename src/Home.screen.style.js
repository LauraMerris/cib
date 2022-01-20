import {StyleSheet} from 'react-native';

const styles = theme => StyleSheet.create({
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
      backgroundColor: theme.colors.BACKGROUND_ACCENT,
      padding: 32,
      margin:0,
    },
    list: {
      flex:3,
      padding:32,
      paddingVertical:16,
      color:theme.colors.TEXT,
    },
    item: {
      paddingVertical: 24,
    },
    itemID: {
      color:theme.colors.TEXT,
    },
    title: {
      fontSize: 18,
      color:theme.colors.TEXT,
    },
    platforms: {
      color:theme.colors.TEXT,
    },
    loading: {
      color:theme.colors.TEXT,
    }
  });

  export default styles;
  