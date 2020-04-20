
import {StyleSheet} from 'react-native';

const color1= '#441785'
const color2= '#B078FF'
const color3= '#842BFF'
const color4= '#4383CC'
const color5= '#441785'
const color6= '#53A4FF'

export default StyleSheet.create({

    Camera:{
      height:'85%',
      width:'100%'
        },
        flipButton:{
          height:'10%',
          width:'100%'
        },
        flipText:{
          
          fontSize: 18, 
          marginBottom: 10, 
          color: 'white'
         
       
        },
        container:{
          flex: 1,
          justifyContent:'space-between',
          alignItems:'center',
        },
        CameraText:{
          fontSize:20,
          color:'#dddddd',
          textShadowColor:'#000000',
          textShadowOffset: {width:1, height:1},
          textShadowRadius:1,
         
        },
        CameraButton:{
          alignItems:'center',
          justifyContent:'center',
          height:'90%',
          width:'100%'
        },
        languageEN:{
          height:'15%',
          width:'100%',
          backgroundColor:'blue',
          justifyContent:'center',
          alignItems:'center'
        },
        languageAR:{
          height:'15%',
          width:'100%',
          backgroundColor:'green',
          justifyContent:'center',
          alignItems:'center'
        },
        languageText:{
          fontSize:30
        }
      }
)