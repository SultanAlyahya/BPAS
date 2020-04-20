import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import * as Speech from 'expo-speech';

import {classifyImage, isModelReady} from './ObjectRecognition'

export  default class object  extends React.Component {
        state = {
                isTfReady: false,
                isModelReady: isModelReady,
                predictions: null,
                image: {uri:this.props.navigation.state.params.imagePath},
                updates:'',
                imageClassified:false
              }

              async componentDidMount() {
                  this.setState({updates:'جاري تجهيز الاعدادات'})
                try{
                //this.checkIfReady
                }catch(error){
                    console.log(error)
                }
              }
              i=0
             checkIfReady =setInterval(async()=>{
                if(isModelReady){
                    this.setState({isModelReady:true})
                    this.setState({updates:'جاري  معالجة الصورة'})
                    const predictions = await classifyImage(this.state.image)
                    this.setState({updates:'تمت المعالجة بنجاح', imageClassified: true, predictions: predictions})
                    Speech.speak(this.state.predictions[0].className)
                    clearInterval(this.checkIfReady);
                }
                console.log(this.i++)
             },500)

             replayTheVoice=async()=>{
                Speech.speak(this.state.predictions[0].className)
             }

             displayAllTheOdds=async()=>{
                 this.state.predictions.forEach(text => {
                    Speech.speak(text.className)
                 });
             }


render() {
        const { isTfReady, isModelReady, predictions, image, } = this.state
    
        return (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
                <Text>{this.state.updates}</Text>
           </View>
           <View style={styles.imageContainer}>
               <TouchableOpacity style={this.state.imageClassified? styles.buttons:styles.blockedButtons}
               onPress={()=> this.state.imageClassified? this.replayTheVoice(): undefined}>
                    <Text style={styles.text}>اعادة العرض  الصوتي</Text>
               </TouchableOpacity>
               <TouchableOpacity style={this.state.imageClassified? styles.buttons:styles.blockedButtons}
               onPress={()=> this.state.imageClassified? this.displayAllTheOdds(): undefined}>
                    <Text style={styles.text}>عرض كل الاحتمالات</Text>
               </TouchableOpacity>
               <TouchableOpacity style={this.state.imageClassified? styles.buttons:styles.blockedButtons}
               onPress={()=> this.state.imageClassified? this.props.navigation.goBack(): undefined}>
                    <Text style={styles.text}>اخذ صورة اخرى</Text>
               </TouchableOpacity>
           </View>
          </View>
        )
      }
     }

     const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#D2EDFC',
        },
        imageContainer: {
            width: '100%',
            height: '50%',
            padding:'5%',
            justifyContent:'center',
            alignItems:'center'
        },
        image: {
            height:200,
            width:200,
            borderWidth:2,
            borderColor:'black',
            borderRadius:10  
        },
        buttons:{
            width:'100%',
            height:'30%',
            borderWidth:1,
            borderColor:'black',
            borderRadius:10,
            marginBottom:'5%',
            backgroundColor:'#3E91FF',
            justifyContent:'center',
            alignItems:'center'
        },
        blockedButtons:{
            width:'100%',
            height:'30%',
            borderWidth:1,
            borderColor:'black',
            borderRadius:10,
            marginBottom:'5%',
            backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center'
        },
        text:{
            fontSize:30,
        },
     })