import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:this.props.navigation.state.params.token || true,
            name:this.props.navigation.state.params.name || true,
            type: this.props.navigation.state.params.type,
            email:'',
            content:''
        }
    }

    render(){
        var text = this.state.type == 'help'? 'please provide your problem detail so we can respond soon as we can':"your thoughts are welcomed"
        return(
            <View style={styles.Scontainer}>
               <View style={styles.lable}>
                    <Text style={this.state.type == 'help'? styles.TextHelp : styles.TextFeadback}>{text}</Text>
               </View>
               <TextInput 
                onChangeText={(text) => this.setState({email: text})}
                placeholder='  email'
                style={styles.email}>
                    </TextInput>
               <TextInput
               onChangeText={(text) => this.setState({content: text})}
               placeholder={this.state.type == 'help'? 'your problem':'your feedback'}
               multiline={true}
               style={styles.textArea}>

               </TextInput>

               <TouchableOpacity style={styles.send}>
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
        //marginBottom:10,
        marginTop:50
    },
    TextFeadback:{
        fontSize:40,
        textAlign:'center'
    },
    TextHelp:{
        fontSize:30,
        textAlign:'center'
    },
    email:{
        width:'90%',
        backgroundColor:'#ffffff',
        borderColor:'#000000',
        borderRadius:20,
        borderWidth:1,
        marginBottom:10,
        fontSize:25
    },
    textArea:{
        width:'90%',
        height:'30%',
        backgroundColor:'#ffffff',
        borderColor:'#000000',
        borderRadius:20,
        borderWidth:1,
        fontSize:20
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
    }


    
    
})