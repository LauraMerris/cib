import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:'90%',
    width:'90%',
  },
  cancelButton:{
    paddingHorizontal:10,
    paddingVertical:16,
    borderRadius:10,
    backgroundColor:'#eee',
    color:'#393939',
    textAlign:"center",
    position:'absolute',
    bottom:45,
    left:'50%',
  },
  cancelButtonText:{
    fontSize:20,
    textAlign:"center",
  },
  selectedPlatform:{
      paddingHorizontal:10,
      paddingVertical:16,
      borderRadius:10,
      borderWidth:1,
      borderColor:'#eee',
      marginBottom:24,
      textAlign:"center",
  },
  selectedPlatformText:{
      fontSize:24,
      textAlign:"center",
      color:'#eee',
  },
  
});

export default styles;