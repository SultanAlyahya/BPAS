import React from 'react';
import { View, Text, StyleSheet} from 'react-native';



export default class SettingsLine extends React.Component{
    
    render(){
        const calls =()=>{
            if(this.props.enable){
                if(this.props.enable == 'Enable'){
                    return styles.enable
                }else{
                    return styles.disable
                }
            }
            return styles.container
        }
        return(
            <View style={calls()}>
                <Text style={styles.text}>{this.props.title}</Text>
             </View>
        )
    }
}





const styles = StyleSheet.create({
    container:{
        height:100,
        width:"100%",
        flexDirection:'row',
        backgroundColor:'#D2EDFC',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
    },
    enable:{
        height:100,
        width:"100%",
        flexDirection:'row',
        backgroundColor:'#00ff00',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
    },
    disable:{
        height:100,
        width:"100%",
        flexDirection:'row',
        backgroundColor:'#ff0000',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
    },
    text:{
        fontSize:30
    }
})