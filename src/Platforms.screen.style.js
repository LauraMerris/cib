import {StyleSheet} from 'react-native';


const styles = theme => StyleSheet.create({
  
  container: {
    padding:0,
    paddingTop:0,
    flex:1,
  },
  modalWrapper:{
    paddingTop:60,
    paddingBottom:0,
    flex:1
  },
  modalView: {
    margin: 0,
    backgroundColor: theme.colors.BACKGROUND,
    borderRadius: 20,
    shadowColor: theme.colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding:0,
    paddingBottom:45,
    flex:1,
  },
  modalHeader:{
    backgroundColor:theme.colors.BACKGROUND,
    borderRadius:20,
    height:60,
  },
  modalHandle:{
    padding:4,
    borderRadius:4,
    backgroundColor:theme.colors.SYSTEM_ITEMS,
    position:'relative',
    top:10,
    width:"10%",
    alignSelf:"center"
  },
  modalBody:{
    paddingHorizontal:45,
    flexGrow:1
  },
  cancelButton:{
    paddingHorizontal:16,
    paddingVertical:16,
    borderRadius:30,
    backgroundColor:theme.colors.SYSTEM_ITEMS,
    color:theme.colors.TEXT,
    textAlign:"center",
    position:'absolute',
    top:0,
    right:10,
    zIndex:100,
  },
  cancelButtonText:{
    fontSize:20,
    textAlign:"center",
  },
});


export default styles;