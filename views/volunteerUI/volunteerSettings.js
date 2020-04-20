import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SettingsLine from '../components/settingsLine'
import Header from '../components/header'

export default class volunteerHomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:this.props.navigation.state.params.token || true,
            name:this.props.navigation.state.params.name || true,
            call: 'Enable'
        }
    }
    render(){
        const a =()=>{
            console.log(this.state.token)
        }
        var id=0
       
        const settings= [{title:'hello' , id:'0'},{title:"account", id:'1'},{title:'help', id:'2'},{title:'change password', id:'3'},{title:this.state.call, id:'5'},{title:'feedback to developers', id:'6'},{title:'logout',id:'8'}]
        return(
            <View style={styles.Scontainer}>
                
                <FlatList
                    data={settings}
                    renderItem={({ item }) => item.id == '0'? <Header  title={item.title+' '+this.state.name} />: <SettingsLine title={item.id == '5'? item.title+' calls':item.title} enable={item.id == '5'? this.state.call:undefined} />}
                    keyExtractor={item => item.id}
                />
  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Scontainer:{
        flex:1,
        
    },
    header:{
        width:'100%',
        height:'30%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D2EDFC',
    },
    textHeader:{
        fontSize:50,
        color:'#333333',

    },
})