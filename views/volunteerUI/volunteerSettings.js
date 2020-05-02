import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import SettingsLine from '../components/settingsLine'
import Header from '../components/header'
import {logout} from '../db/Userdb'

export default class volunteerHomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:this.props.navigation.dangerouslyGetParent().getParam("token"),
            name:this.props.navigation.dangerouslyGetParent().getParam('name'),
            call: this.props.navigation.dangerouslyGetParent().getParam('call'),
        }
    }

    toggleCalls =async()=>{

        const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/toggleCalls', {
        method: 'PATCH',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            token:this.state.token
          }
        })
        if(res.status == 200){
        this.setState({call:!this.state.call})
        this.props.navigation.setParams({call: !this.state.call});
        }
    }

    //=======================================

    logout =async()=>{
        const isLogout = await logout()
        if(isLogout){
            const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/logout', {
                method: 'GET',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    token:this.state.token
                }
            })
            if(res.status == 200){
                this.props.navigation.navigate('decideP')
            }
        }
    }

    //=====================================

    sendMessage =(type)=>{
        this.props.navigation.navigate('MessageP',{
            type:type,
            token:this.state.token,
            name:this.state.name
        })
    }

    change=(change)=>{
        this.props.navigation.navigate(change,{
            token:this.state.token,
        })

    }

    render(){

        

        
        return(
            <ScrollView style={styles.Scontainer}>
                
                {/* <FlatList
                    data={settings}
                    renderItem={({ item }) => item.id == '0'? <Header  title={item.title+' '+this.state.name} />: <SettingsLine title={item.id == '5'? item.title+' calls':item.title} enable={item.id == '5'? this.state.call:undefined} />}
                    keyExtractor={item => item.id}
                /> */}
                <View style={styles.header}>
                <Text style={styles.textHeader}>
                    Hello {this.state.name}
                </Text>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity style={styles.buttons}
                    onPress={()=>this.sendMessage('help')}>
                        <Text style={styles.buttonsText}>
                            help
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}
                    onPress={()=>this.change('ChangePasswordP')}>
                        <Text style={styles.buttonsText}>
                            change password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}
                    onPress={()=>this.change('ChangeNmaeP')}>
                        <Text style={styles.buttonsText}>
                            change name
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}
                    onPress={()=>this.sendMessage('feedback')}>
                        <Text style={styles.buttonsText}>
                            feedback to developers
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.call?styles.enableButton:styles.disableButton}
                    onPress={()=>this.toggleCalls()}>
                        <Text style={styles.buttonsText}>
                            {this.state.call? 'Click to disable calls':'Click to enable calls'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}
                    onPress={()=>this.logout()}>
                        <Text style={styles.buttonsText}>
                            logout
                        </Text>
                    </TouchableOpacity>
                </View>
  
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Scontainer:{
        flex:1,
        backgroundColor:'#d3d3d3',
        
    },
    header:{
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
        
    },
    textHeader:{
        fontSize:50,
        color:'#333333',
    },
    body:{
        height:'70%',
        width:'100%'
    },
    buttons:{
        height:100,
        //width:'96%',
        margin:2,
        borderRadius:10,
        backgroundColor:'#ffffff',
        justifyContent:'center'
        
    },
    buttonsText:{
        fontSize:35,
    },
    enableButton:{
        height:100,
        //width:'96%',
        backgroundColor:'#00ff00',
        margin:2,
        borderRadius:10,
        justifyContent:'center'
    },
    disableButton:{
        height:100,
        //width:'96%',
        backgroundColor:'#ff0000',
        margin:2,
        borderRadius:10,
        justifyContent:'center' 
    },
})