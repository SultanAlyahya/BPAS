import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Settings, Image, TextInput, ActivityIndicator} from 'react-native';
import {saveUserdata, retrieveData} from '../db/Userdb'

import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default class creatAccountB extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            password:'',
            data:'',
            errorEmail: '',
            errorPass:'',
            errorLogin:'',
            loginState:false
        };
      }

      componentDidMount(){
              
        PushNotification.configure({
          
                    // (optional) Called when Token is generated (iOS and Android)
                    onRegister: function(token) {
                      console.log("TOKEN:", token);
                    },
                    // Android only
                    senderID: "170601632573",
                    // iOS only
                    permissions: {
                      alert: true,
                      badge: true,
                      sound: true
                    },
                    popInitialNotification: true,
                    requestPermissions: true
            
                  })
      
            }
             

    savelogin= async(email, password)=>{
        //saveUserdata(login)
        if(email === ''){
            this.setState({
                errorEmail:'الرجاء ادخال البريد الالكتروني'
            })
        }else{
            this.setState({errorEmail:''})
        }
        if(password ===''){
          this.setState({
            errorPass: 'الرجاء ادخال الرقم السري'
          })  
        }else{
            this.setState({errorPass:''})}
        const res = await fetch('https://assistance-system-back-end.herokuapp.com/User/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
        })
        if(res.status !== 200){
            this.setState({
                errorLogin:'البريد الإلكتروني/ الرقم السري غير صحيح'
            })
        }else{
            this.setState({
                errorLogin:''
            })
            const resJ = await res.json()
            console.log(resJ)
            await saveUserdata(res.headers.map.token, 'user')
            this.props.navigation.navigate('blindHomePageP',{token:res.headers.map.token})
        }
       
        
       //console.log(res.body.)
    }
    retrievelogin=async()=>{
        const data = await retrieveData()
        console.log(data.name)
    }
    testnotificatios=async()=>{
        await fetch('http://localhost:3000/User/notifications', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: 's',
              }),
        })
    }
    render(){
        
        return(
            <ImageBackground source={require('../../images/loginBackground.jpg')}
             style={styles.container}>
                 <View style={styles.whitebackground}>
                    <Text style={styles.header}>login</Text>
        <Text style= {styles.errorMessage} >{this.state.errorLogin}</Text>
                    <TextInput style={styles.userName}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder='  Email'
                    ></TextInput>
                    <Text style ={styles.errorMessage}>{this.state.errorEmail}</Text>
                    <TextInput style={styles.userName}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder=' password'
                    secureTextEntry={true}
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorPass}</Text>
                    <View style={styles.loginV}>
                    {
                        !this.state.loginState?
                        <TouchableOpacity style={styles.loginB}
                        onPress={()=>{ //this.savelogin(this.state.email, this.state.password)
                            this.savelogin(this.state.email,this.state.password)
                        }}> 
                        
                            <Text style={styles.loginText}>تسجيل دخول</Text>
                        </TouchableOpacity> :
                        <View style={styles.render}>
                            <ActivityIndicator size="large" color="#000000" />
                        </View>
                    }      
                        <TouchableOpacity style={styles.loginB}
                        onPress={()=> this.props.navigation.navigate('signupUserP')} >
                        <Text style={styles.loginText}>تسجيل حساب جديد</Text>
                        </TouchableOpacity>    
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:'10%'
    },
    userName:{
        height:'10%',
        width:'90%',
        borderColor:'#000000',
        borderWidth:1,
        borderRadius:10,
        margin:'5%',
        fontSize:25,
    },
    loginB:{
        height:'50%',
        width:'100%',
        backgroundColor:'#53A4FF',
        alignItems:'center',
        justifyContent:'center',
        // borderColor:'#000000',
        // borderWidth:1,
        borderRadius:10,
        marginBottom:'2%',
    },
    render:{
        height:'50%',
        width:'100%',
        //backgroundColor:'#53A4FF',
        alignItems:'center',
        justifyContent:'center',
        // borderColor:'#000000',
        // borderWidth:1,
        borderRadius:10,
        marginBottom:'2%',
    },
    loginText:{
        fontSize:20,
        color:'#ffffff',
    },
    header:{
        fontSize:50,
        marginBottom:'10%'
    },
    loginV:{
        height:'20%',
        width:'94%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
    },
    sginup:{
        fontSize:15,
        color:'#333333',
        textDecorationLine:'underline',
    },
    whitebackground:{
        width:'100%',
        height:'70%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:20
    },
    errorMessage:{
        color:'red',
        
    }
})