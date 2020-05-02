import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity, ImageBackground, Settings, Image, TextInput, ActivityIndicator} from 'react-native';
import {saveData} from '../db/Userdb'
import PushNotification from "react-native-push-notification";



export default class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            Password:'',
            data:'',
            errorEmail:'',
            errorPass:'',
            errorLogin:'',
            notificationToken:'',
            loginState:false
        };
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
          senderID: "411311542797",
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

    

      //the function is async becuase in this function there will be a data the will get sometime to come like get data from server
    savelogin= async(email, password)=>{
        //ths fetch function is a way to get or send info to/from the server 
        // write "await" before the variable value because the data for this variable will take sometime to come
        //the "method" for the fetch is to till the server what to do
        //1-method "GET" this method get no data in the body it's just used to get data like "get statistics"
        //2-method "POST" we use this method to send data to server like send new user info or send email and password to check or....
        //3-method "DELETE" this method is for tilling the server take that info we send and delete tha match
        //4-method "PATCH" this method is for tilling the server take that info we send and modify tha match
        //note that you can send info with all the methods except GET

        //you can send data with header and body but it's better to send the data in the body because anyone can see the data in the header

        //mostly the header is used to send the token to the server
        //the token is used to know who send the request and if he is authorized or not

        // the "JSON.stringify" in the body is for make the data in String format because you cant send anything but String in HTTP request

        //note that our domain name is https://assistance-system-back-end.herokuapp.com 
        if(email === ''){
            this.setState({
                errorEmail: 'الرجاء ادخال البريد الالكتروني' 
            })}else{
                this.setState({
                    errorEmail:''
                })
            }
            if(password === ''){
                this.setState({
                    errorPass: 'الرجاء ادخال الرقم السري' 
                })}else{
                    this.setState({
                        errorPass: ''
                    })
                }
            
        //console.log('here',this.state.errorEmail, this.state.errorPass)
        //console.log(email, password)
        //let token = await Notifications.getExpoPushTokenAsync();
        try{
            this.setState({loginState:true})
            const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/Login', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
                notificationToken:this.state.notificationToken
              }),
            })
            if(res.status !== 200){
                this.setState({
                    errorLogin:'البريد الإلكتروني/ الرقم السري غير صحيح'
                })
            }
            else{
                this.setState({
                    errorLogin:''
                })
                const resJ = await res.json()
                this.setState({loginState:false})
                saveData(res.headers.map.token,'volunteer')
                console.log('token',res.headers.map.token)
                //console.log(res.headers.map.token)
                this.props.navigation.navigate('tabNavigaitonP',{
                    token: res.headers.map.token,
                    name: resJ.name,
                    call: resJ.call,
                    rating: resJ.rating,
                    numberOfBlindPeople: resJ.numberOfBlindPeople,
                    numberOfCalls: resJ.numberOfCalls,
                    numberOfActiveVolunteers: resJ.numberOfActiveVolunteers,
                    numberOfVolunteers: resJ.numberOfVolunteers
                })
            }
        }catch(error){
        console.log(error)
        } 
    }
    
    render(){
        
        return(
            <ImageBackground source={require('../../images/loginBackground.jpg')}
             style={styles.container}>
                 <View style={styles.whitebackground}>
                    <Text style={styles.header}>login</Text>
        <Text style={styles.errorMessage}>{this.state.errorLogin}</Text>
                    <TextInput style={styles.userName}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder='  Username'
                     
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>
                    <TextInput style={styles.userName}
                    onChangeText={(text) => this.setState({Password: text})}
                    placeholder='  Password'
                    secureTextEntry={true}
                    ></TextInput>
                    <Text style={styles.errorMessage}>{this.state.errorPass}</Text>
                    <View style={styles.loginV}>
                    {
                        !this.state.loginState? <TouchableOpacity style={styles.loginB}
                     onPress={()=> this.savelogin(this.state.email, this.state.Password)}>
                        <Text style={styles.loginText}>login</Text>
                        </TouchableOpacity>:
                        <View style={styles.render}>
                            <ActivityIndicator size="large" color="#000000" />
                        </View>
                        }
                        <Text style={styles.sginup} onPress={()=> this.props.navigation.navigate('signupP')}>create new account</Text>
                        {/* <Text style={styles.sginup} onPress={()=> this.retrievelogin()}>foget Password</Text> */}
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