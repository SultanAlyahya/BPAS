import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { fromTexture } from '@tensorflow/tfjs-react-native';
import * as Speech from 'expo-speech';

export default class textPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            text:'تتم معالجة الصورة حاليا',
            ready:false,
            language:this.props.navigation.state.params.language,
            imageURI:this.props.navigation.state.params.imageURI
        };
      }
    async componentDidMount() {
        const data = new FormData();
        console.log('in')
          data.append("form", {
            name: "image.jpeg",
            type: "image/jpeg",
            uri:
              Platform.OS === "android" ? this.state.imageURI : this.state.imageURI.replace("file://", "")
          });
          try{
            const res = await fetch("https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/ocr?language="+this.state.language, {
              method: 'POST',
              headers: {
                'x-rapidapi-host': 'microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com',
              'x-rapidapi-key': 'cd030e1ea2msh070cf39ee790c48p13b720jsnf874d7a09567',
              'Content-Type': 'application/x-www-form-urlencoded'
              },
                body: data,
          })
          const resJ = await res.json()
          if(resJ.regions.length != 0){
            const text = this.formatText(resJ)
            //alert(resJ)
            //console.log(text)
            Speech.speak(text)
            this.setState({text:text, ready:true})
            }
            else{
                this.setState({text:'لم يتم التقاط اي نص في الصورة'})
            }
        }catch(error){
         console.log(error)
        } 
    }

    formatText=(res)=>{
        var allWords=''
        res.regions[0].lines.forEach(words=>words.words.forEach(text=>{
                console.log(text.text)
                allWords+=text.text+" "
            }))
        return allWords
    }
          
    render(){
        return(
            <View style={styles.containar}>
                <View style={styles.textContainar}>
                    <Text style={styles.text}>{this.state.text}</Text>
                </View>
                <View style={styles.buttonsContainar}>
                    <TouchableOpacity style={this.state.ready? styles.buttons: styles.disButtons}
                    onPress={()=> this.state.ready? Speech.speak(this.state.text): undefined}>
                        <Text style={styles.text}>اعادة العرض  الصوتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.ready? styles.buttons: styles.disButtons}
                    onPress={()=> this.state.ready? this.props.navigation.goBack():undefined}>
                        <Text style={styles.text}>اخذ صورة اخرى</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containar:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#D2EDFC',
    },
    textContainar:{
        height:'40%',
        width:'80%',
        borderRadius:20,
        borderColor:'black',
        borderWidth:2,
        padding:'5%',
        margin:'10%',
        backgroundColor:'white'
    },
    buttonsContainar:{
        height:'50%',
        width:'100%',
        alignItems:'center',
        backgroundColor:'#D2EDFC',
        padding:'5%'
    },
    text:{
        fontSize:20
    },
    buttons:{
        height:'40%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3E91FF',
        margin:'2%',
        borderWidth:1,
        borderColor:'black',
        borderRadius:10
    },
    disButtons:{
        height:'40%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        margin:'2%',
        borderWidth:1,
        borderColor:'black',
        borderRadius:10
    }
})