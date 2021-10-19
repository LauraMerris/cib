import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  
  centeredView: {
    flex:1,
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cancelButton:{
    paddingHorizontal:16,
    paddingVertical:16,
    borderRadius:30,
    backgroundColor:'#eee',
    color:'#393939',
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
  flex:{
    flex:1
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop:0,
  },
  modalHeader:{
    backgroundColor:'white',
    height:60,
    borderRadius:20
  },
  modalHandle:{
    padding:4,
    borderRadius:4,
    backgroundColor:'lightgray',
    position:'relative',
    top:10,
    width:"30%",
    alignSelf:"center"
},
modalBody:{
  paddingHorizontal:45,
}
});


export default styles;