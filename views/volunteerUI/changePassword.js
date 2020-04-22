import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

export default class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:this.props.navigation.state.params.token || true,
            password1:'',
            password2:'',
            theSame:true,
            changed:true
        }
    }

    render(){

        const changePassword=async()=>{
            if(this.state.password1 === this.state.password2){
                this.setState({theSame:true})
                const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/updateData', {
                    method: 'PATCH',
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                        'token':this.state.token
                    },
                    body: JSON.stringify({
                        password:this.state.password1
                    }),
                })
                if(res.status == 200){
                    this.props.navigation.goBack()
                    return
                }
                this.setState({changed:false})      
                
            }
            this.setState({theSame:false})
        }

        return(
            <View style={styles.Scontainer}>
               <View style={styles.lable}>
                    <Text style={styles.Textlable}>
                        write your new password
                    </Text>
               </View>
               <TextInput 
                onChangeText={(text) => this.setState({password1: text})}
                placeholder='password'
                style={styles.password}
                secureTextEntry={true}>
                </TextInput>

                <TextInput 
                onChangeText={(text) => this.setState({password2: text})}
                placeholder='same password again'
                style={styles.password}
                secureTextEntry={true}>
                </TextInput>
                {
                    this.state.theSame?undefined:
                    <Text style={styles.notSame}>المرز السري يجب ان يكون متطابق في الخانتان</Text>
                }
                 {
                    this.state.changed?undefined:
                    <Text style={styles.notSame}>حدث خطآ اثناء محاولة تغيير الرمز السري الرجاء المحاولة مره اخرى</Text>
                }

               <TouchableOpacity style={styles.send}
               onPress={()=>changePassword()}>
                    <Text style={styles.sendText}>send</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Scontainer:{
        flex:1,
        backgroundColor:'#D2EDFC',
        alignItems:'center'
    },
    lable:{
        height:'20%',
        width:'100%',
        //marginBottom:20,
        marginTop:50
    },
    Textlable:{
        fontSize:40,
        textAlign:'center'
    },
    password:{
        width:'90%',
        backgroundColor:'#ffffff',
        borderColor:'#000000',
        borderRadius:20,
        borderWidth:1,
        marginBottom:10,
        fontSize:25
    },
    send:{
        height:'15%',
        width:'90%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000',
        position:'absolute',
        bottom:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3E91FF'
    },
    sendText:{
        fontSize:50
    },
    notSame:{
        color:'#ff0000',
        fontSize:25
    } 
})