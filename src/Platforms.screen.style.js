import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cancelButton:{
    paddingHorizontal:10,
    paddingVertical:16,
    borderRadius:10,
    backgroundColor:'#eee',
    color:'#393939',
    textAlign:"center",
    position:'absolute',
    top:10,
    right:10,
  },
  cancelButtonText:{
    fontSize:20,
    textAlign:"center",
  },
  flex:{
    flex:1
  },
  modalView: {
    margin: 0,
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
});


export default styles;