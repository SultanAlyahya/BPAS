import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground,TextInput} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import loginData from '../db/Userdb'
import {saveData}  from '../db/Userdb'
import PushNotification from "react-native-push-notification";
//import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default class sginup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            rePassword:'',
            errorEmail:'',
            errorPas:'',
            errorName:'',
            errorCreateAcc:'',
            errorRePass:'',
            notificationToken:''
        }
    }

    async componentDidMount() {
       
          
            console.log('in')
            PushNotification.configure({
                
              // (optional) Called when Token is generated (iOS and Android)
              onRegister: (token)=> {
                console.log("TOKEN:", token);
                this.setState({notificationToken:token.token})
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

   craeteUser = async(name,email,password,rePassword)=>{
        console.log(name,email, password)
        if(name ===''|| email ==='' ||password ===''||rePassword ===''){
            if(name === ''){
                this.setState({
                    errorName:'الرجاء ادخال اسم المستخدم' 
                })
            }if(email ===''){
                this.setState({
                    errorEmail: 'الرجاء ادخال البريد الالكتروني' 
                })
            }if(password  ===''){
                this.setState({
                    errorPas: 'الرجاء ادخال الرقم السري'
                }) 
            }if(rePassword  ===''){
                this.setState({
                    errorRePass: 'الرجاء ادخال الرقم السري'
                }) 
            }

        }else if(!email.includes('@') && !email.includes('.')){
            this.setState({
                errorEmail:'الرجاء ادخال بريد الكتروني صالح'
            })
        }if(password !== rePassword){
            this.setState({
                errorRePass: ' الرقم السري غير صحيح'
            }) 
        }
        else{
            this.setState({
                errorEmail:'',
                errorPas:'',
                errorName:'',
            })
        //console.log(token)
        const res = await fetch('https://assistance-system-back-end.herokuapp.com/User/Signup', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name:name,
                email: email,
                password: password,
              }),
        })
      
         
        const resJ = await res.json()
        console.log(resJ)
        
        console.log(resJ.error,`status code: ${res.status}`)
        if(res.status !== 201 && resJ.error ==='the email has been used'){
            this.setState({
                errorCreateAcc:'البريد الإلكتروني مستخدم'
            })
        }else{
            this.setState({
                errorCreateAcc:''
            })
            saveData(res.headers.map.token,'user')
            this.props.navigation.navigate('createAccountBP')
            console.log("im here after navigate ")
        }
    }
        }


    render(){
        return(
            <ImageBackground source={require('../../images/loginBackground.jpg')}
             style={styles.container}>
                 <View style={styles.whitebackground}>
                    <Text style={styles.header}> حساب جديد </Text>
                    <Text style={styles.errorSignup}>{this.state.errorCreateAcc}</Text>
                    <TextInput style={styles.userName}
                    placeholder='  Username'
                    onChangeText={(text)=>this.setState({name: text})}
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorName}</Text>
                    <TextInput style={styles.userName}
                     onChangeText={(text)=>this.setState({email: text})}
                    placeholder='  Email'
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>
                    <TextInput style={styles.userName}
                     onChangeText={(text)=>this.setState({password: text})}
                    placeholder='  Password'
                    secureTextEntry={true}
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorPas}</Text>
                    <TextInput style={styles.userName}
                    placeholder='  Re-password'
                    onChangeText={(text)=>this.setState({rePassword: text})}
                    secureTextEntry={true}
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorRePass}</Text>
                    
                    <View style={styles.loginV}>
                    <TouchableOpacity style={styles.loginB}
                    onPress={()=>this.craeteUser(this.state.name, this.state.email,this.state.password,this.state.rePassword)}>
                        <Text style={styles.loginText}>انشاء حساب جديد</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            // this. props.navigation.navigate('volunteerHomePageP'
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
    loginText:{
        fontSize:20,
        color:'#ffffff',
    },
    header:{
        fontSize:25,
        marginBottom:'-3%'
    },
    loginV:{
        height:'20%',
        width:'94%',
    },
    sginup:{
        fontSize:15,
        color:'#333333',
        textDecorationLine:'underline',
    },
    whitebackground:{
        width:'100%',
        height:'90%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        borderRadius:20
    },
    errorMessage:{
        color:'red',
        
    }
    ,errorSignup:{
        margin:'2%',
        color:'red'
    }

})