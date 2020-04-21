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
               <View>
                    <Text></Text>
               </View>
               <TextInput 
                onChangeText={(text) => this.setState({email: text})}
                placeholder='  email'>

                    </TextInput>
               <TextInput
               onChangeText={(text) => this.setState({email: text})}
               placeholder={this.state.type == 'help'? 'your problem':'your feedback'}
               multiline={true}>

               </TextInput>

               <TouchableOpacity>

               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Scontainer:{
        flex:1,
        backgroundColor:'#d3d3d3',
    },
    lable:{
        height:'20%',
        width:'100%'
    },
    lableText:{
        fontSize:40
    },
    email:{
        width:'75%',
    },
    textArea:{
        width:'75',
        height:'30%'
    },
    send:{
        height:'15%',
        width:'90%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000'
    },
    sendText:{
        
    }


    
    
})