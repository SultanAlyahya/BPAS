import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {isModelReady, getReady} from './ObjectRecognition'
import requestCameraAndAudioPermission from './permission'

export default class blindHomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            is:'',
            token:this.props.navigation.state.params.token,
            room:''
        };
        if (Platform.OS === 'android') {                    //Request required permissions from Android
            requestCameraAndAudioPermission().then(_ => {
              console.log('requested!');
            });
          }
      }
    async componentDidMount() {
        try{
            if(!isModelReady){
               //await getReady()
            }
            console.log(true)
        }catch(error){
            console.log(error)
        }
        var room=""
        for(var i=1;i<=5;i++){
            room=room+this.state.token[this.state.token.length-i]
        }
        this.setState({room:room})
        console.log('the room',this.state.room)
        console.log('the token', this.state.token)
    }
          
    render(){
        return(
            <View style={styles.containar}>
                <TouchableOpacity style={styles.buttons}
                onPress={()=> this.props.navigation.navigate('VideoCallP',{
                    room:this.state.room,
                    id:'4ed3c1e0fb52417994f45aeeb720db46',
                    token:this.state.token
                  })}>
                    <Text style={styles.text}>اتصل بمتطوع</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=> this.props.navigation.navigate('CameraP')}>
                    <Text style={styles.text}>الكشف عن عمله</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=> this.props.navigation.navigate('TextP')}>
                    <Text style={styles.text}>قراءة نص</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=> this.props.navigation.navigate('CameraP')}>
                    <Text style={styles.text}>الكشف عن مجسم</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containar:{
        flex:1,
        justifyContent:'space-around',
        padding:'3%',
        backgroundColor:'#D2EDFC',
    },
    buttons:{
        height:"24%",
        width:'100%',
        backgroundColor:'#3E91FF',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:30,
    },
})
