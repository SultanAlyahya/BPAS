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


        const logout =async()=>{
            const res = await fetch('https://assistance-system-back-end.herokuapp.com/User/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token':this.state.token
              },
            })

            if(res.status == 200){
                this.props.navigation.navigate('decideP')
            }
        
        }

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
                onPress={()=> this.props.navigation.navigate('TextP')}>
                    <Text style={styles.text}>قراءة نص</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=> this.props.navigation.navigate('CameraP')}>
                    <Text style={styles.text}>الكشف عن مجسم</Text>
                </TouchableOpacity>
                <View style={styles.settingsView}>
                    <TouchableOpacity style={styles.settingsButtons}
                    onPress={()=>logout()}>
                        <Text style={styles.text}>تسجيل الخروج</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsButtons}>
                        <Text style={styles.text}>شرح للبرنامج</Text>
                    </TouchableOpacity>
                </View>
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
    settingsView:{
        height:'24%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    settingsButtons:{
        width:'49%',
        height:'100%',
        backgroundColor:'#3E91FF',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#000000',
        borderWidth:1
    },
    settingsText:{

    }
})
