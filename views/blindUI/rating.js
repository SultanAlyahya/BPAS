import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';


export default class rating extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            is:'',
            token:this.props.navigation.state.params.token,
            room:''
        };
      }
    async componentDidMount() {
      
    }
          
    render(){

        const rate=async(rate)=>{
            console.log(rate)
            await fetch('https://assistance-system-back-end.herokuapp.com/rateVolunteer', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'token':this.state.token
                    },
                    body: JSON.stringify({
                    rate:rate
                    }),
                })
            this.props.navigation.navigate('blindHomePageP',{token:this.state.token})
        }
        return(
            <View style={styles.containar}>
                <View style={styles.lable}>
                    <Text style={styles.lableText}>
                    ارجو التقييم من ١ الاسوء الى ٥ الافضل
                    </Text>
                </View>
               <TouchableOpacity onPress={()=>rate(1)}
               style={styles.buttons}>
                   <Text style={styles.lableText}>1</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>rate(2)}
               style={styles.buttons}>
                   <Text style={styles.lableText}>2</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>rate(3)}
               style={styles.buttons}>
                   <Text style={styles.lableText}>3</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>rate(4)}
               style={styles.buttons}>
                   <Text style={styles.lableText}>4</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>rate(5)}
               style={styles.buttons}>
                   <Text style={styles.lableText}>5</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>rate()}
               style={styles.buttons}>
                   <Text style={styles.lableText}>تخطي التقييم</Text>
                </TouchableOpacity>
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
    lable:{
        width:'100%',
        height:'20%'
    },
    lableText:{
        fontSize:30,
        textAlign:'center'
    },
    buttonsView:{
        width:'100%',
        height:'80%',
        justifyContent:'space-around'
    },
    buttons:{
        width:'100%',
        height:'12%',
        backgroundColor:'#3E91FF',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        borderRadius:10
    }
    
})
