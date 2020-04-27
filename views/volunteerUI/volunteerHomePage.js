import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createAppContainer, } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import settings from './volunteerSettings'
//import { Ionicons } from '@expo/vector-icons';

import { PieChart } from 'react-native-svg-charts'
import { Text as TextAsg} from 'react-native-svg'
//import styles from '../styles';
import Svg, {Rect} from 'react-native-svg';


class volunteerHomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:this.props.navigation.dangerouslyGetParent().getParam("token"),
            name:this.props.navigation.dangerouslyGetParent().getParam('name'),
            rating:(Math.round(this.props.navigation.dangerouslyGetParent().getParam('rating') * 100) / 100).toFixed(1) || 0,
            call: this.props.navigation.dangerouslyGetParent().getParam('call'),
            numberOfBlindPeople: this.props.navigation.dangerouslyGetParent().getParam('numberOfBlindPeople') || 0,
            numberOfCalls: this.props.navigation.dangerouslyGetParent().getParam('numberOfCalls') || 0,
            numberOfActiveVolunteers: this.props.navigation.dangerouslyGetParent().getParam('numberOfActiveVolunteers') || 0,
            numberOfVolunteers: this.props.navigation.dangerouslyGetParent().getParam('numberOfVolunteers') || 0

        }
    }
    async componentDidMount() {
        
        // try{
        // console.log('in')
        // const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/getCall', {
        //     method: 'POST',
        //     headers: {
        //         "Accept": 'application/json',
        //         'Content-Type': 'application/json',
        //         token:this.state.token
        //       },
        // })
        // if(res.status == 200){
        //     const data = await res.json()
        //     console.log(data)
        //     this.setState({
        //         call:data.call,
        //     })
        // }
        // }catch(error){
        //     console.log(error)
        // }
    }
    render(){
        const data = [
            {
                key: 1,
                amount: this.state.numberOfVolunteers,
                svg: { fill: '#0000ff' },
            },
            {
                key: 2,
                amount: this.state.numberOfBlindPeople,
                svg: { fill: '#00ff00' }
            },
        ]
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <TextAsg
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </TextAsg>
                )
            })
        }

        const digits=()=>{
            
        }

        return(
            <View style={styles.containar}>
                <View style={styles.topContainer}>
                
                </View>
                
                
                <View style={styles.statestic}>
                    <View style={styles.PieCover}>
                        <PieChart
                        style={styles.Pie}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'100%'}
                        innerRadius={'0%'}
                        padAngle={0}
                        >
                        <Labels/>
                        </PieChart>
                    </View>
                    <View style={styles.nextPie}>
                        <View style={styles.chartTextCover}>
                            <Svg width="20" height="20">
                                <Rect x="0"
                                    y="0"
                                    width="20"
                                    height="20"
                                    fill="rgb(0,0,255)"
                                    strokeWidth="1"
                                    stroke="rgb(0,0,0)"/>
                            </Svg>
                            <Text style={styles.chartText}>volunteers</Text>
                        </View>
                        <View style={styles.chartTextCover}>
                            <Svg width="20" height="20">
                                <Rect x="0"
                                    y="0"
                                    width="20"
                                    height="20"
                                    fill="rgb(0,255,0)"
                                    strokeWidth="1"
                                    stroke="rgb(0,0,0)"/>
                            </Svg>
                            <Text style={styles.chartText}>Users</Text>
                        </View>                     
                    </View>
                </View>
                <View style={styles.settings}>
                    <View style={styles.settingsBox}>
                        <View style={styles.topText}><Text style={styles.text}> calls received</Text></View>
                        <View style={styles.buttomText}><Text style={styles.text}>{this.state.numberOfCalls}</Text></View>
                    </View>
                    <View style={styles.settingsBox}>
                        <View style={styles.topText}><Text style={styles.text}>Rating</Text></View>
                        <View style={styles.buttomText}><Text style={styles.text}>5/{this.state.rating.toString()}</Text></View>
                    </View>
                    <View style={styles.settingsBox}>
                        <View style={styles.topText}><Text style={styles.text}> calls</Text></View>
                        <View style={this.state.call? styles.callsEnabel : styles.callsDisabel}><Text style={styles.text}>{this.state.call? 'Calls enabled':'Calls disabled'}</Text></View>
                    </View>
                    <View style={styles.settingsBox}>
                        <View style={styles.topText}><Text style={styles.text}>active volunteers</Text></View>
                        <View style={styles.buttomText}><Text style={styles.text}>{this.state.numberOfActiveVolunteers}</Text></View>
                    </View>
                </View>
            </View>
        )
    }
}



const TabNavigator = createBottomTabNavigator({
    Home: volunteerHomePage,
    Settings:settings,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'Home') {
              iconName = 'ios-home'
                
              // Sometimes we want to add badges to some icons.
              // You can check the implementation below.
              //IconComponent = HomeIconWithBadge;
            } else if (routeName === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
    
            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
    }
  );
  
  export default TabNavigator;




const styles = StyleSheet.create({
    containar:{
        flex:1,
        justifyContent:'space-around',
        backgroundColor:'#D2EDFC',
        padding:0,
        paddingTop:'10%'
    },
    statestic:{
        height:'30%',
        width:'90%',
        backgroundColor:'white',
        margin:"5%",
        justifyContent:'center',
        //alignItems:'center',
        borderColor:'#3d3d3d',
        borderWidth:1,
        marginTop:0,
        borderRadius:20,
        flexDirection:'row',
        paddingTop:10,
        //marginTop:'15%'
    },
    settingsBox:{
        width:"46%",
        height:"46%",
        justifyContent:'center',
        alignItems:'center',
        margin:'2%',
        //paddingBottom:2
        //flexDirection:"row"
    },
    settingsBoxRight:{
        width:"46%",
        height:"50%",
        borderColor:"black",
        borderColor:'#3d3d3d',
        borderLeftWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        margin:'2%'
        //flexDirection:"row"
    },
    settings:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:"100%",
        height:'50%',
        //padding:"2%",
        justifyContent:'space-between',
        //marginTop:'-5%'
        //backgroundColor:'black',
        padding:'1%'
    },
    info:{
        height:"10%",
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
        //marginBottom:'-5%',
        //marginTop:'-5%',
        
        //backgroundColor:'black'
    },
    name:{
        fontSize:50,
        color:'#35363D',
        
    },
    topText:{
        
        width:'100%',
        height:'70%',
        borderBottomWidth:2,
        borderLeftColor:'black',
        alignItems:"center",
        justifyContent:'center',
        borderWidth:2,
        borderColor:'black',
        borderTopEndRadius:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderTopStartRadius:20,
        borderBottomWidth:0
        //backgroundColor:'#3E91FF'
    },
    buttomText:{
        height:'30%',
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#3E91FF',
        borderWidth:2,
        borderColor:'black',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
        
    },
    text:{
        fontSize:30,
        color:'#35363D',
        textAlign:'center'
    },
    statesticText:{
        fontSize:50,
    },
    callsEnabel:{
        height:'30%',
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#00ff00',
        borderWidth:2,
        borderColor:'black',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
    },
    callsDisabel:{
        height:'30%',
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#ff0000',
        borderWidth:2,
        borderColor:'black',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
    },
    topContainer:{
        height:'25%',
        width:'100%',
        position:"absolute",
        backgroundColor:'#3E91FF',
        top:0
    },
    Pie:{
        height:'100%',
        //backgroundColor:'black',
        //marginTop:'10%'
       
    },
    PieCover:{
        width:'50%',
        height:'100%',
        justifyContent:'center'
        //paddingTop:'10%',
        //paddingBottom:'10%'
    },
    nextPie:{
        width:'50%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    chartTextCover:{
        flexDirection:'row',
        //justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'50%',
        marginLeft:20
    },
    chartText:{
        fontSize:30,
        marginLeft:10
    }
})