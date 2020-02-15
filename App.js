import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { Images, Profiles } from './App/Themes';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class App extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY()
    this.state={
      currentIndex:0
    }
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[0,0,1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,0],
      extrapolate: 'clamp'
    })

  }



  componentWillMount(){
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder:(evt, gestureState) =>true,
      onPanResponderMove:(evt, gestureState) =>{
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt, gestureState)=>{
        if(gestureState.dx>120){
          Animated.spring(this.position,{
            toValue:{x:SCREEN_WIDTH+100,y:gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex:this.state.currentIndex+1},()=>{
              this.position.setValue({x:0,y:0})
            })
          })
        }
        else if(gestureState.dx <-120){
          Animated.spring(this.position,{
            toValue:{x:-SCREEN_WIDTH-100,y:gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex:this.state.currentIndex+1},()=>{
              this.position.setValue({x:0,y:0})
            })
          })
        }
        else{
          Animated.spring(this.position,{
            toValue:{x:0, y:0},
            friction:4
          }).start()
        }
      }
    })
  }

  loadUser=()=>{

    var loadedProfile = Profiles.random();
    this.state = {
      profileImage: loadedProfile.image,
      name: loadedProfile.name,
      age: loadedProfile.age,
      occupation: loadedProfile.occupation
    };

    return(
     <Animated.View {...this.PanResponder.panHandlers} style = {[{transform: this.position.getTranslateTransform()},styles.animatedView]}>
        
        
        <Animated.View style={{opacity:this.likeOpacity,position:'absolute',top:50,left:40,zIndex:1000}}>
          <Text style={{borderWidth:1, borderColor:'green',color:'green',fontSize:30,
          fontWeight:'800', padding:10}}>Like</Text>
        </Animated.View>

        <Animated.View style={{opacity:this.dislikeOpacity,position:'absolute',top:50,right:40,zIndex:1000}}>
          <Text style={{borderWidth:1, borderColor:'red',color:'red',fontSize:30,
          fontWeight:'800', padding:10}}>Dislike</Text>
        </Animated.View>

      <Image source={this.state.profileImage} style={styles.images}/>

      <Text style={styles.name}>
        {this.state.name}, {this.state.age}
      </Text>

      <Text style={styles.description}>{this.state.occupation}</Text>
    </Animated.View>    
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>

          <Image source={Images.cog} style={styles.logo}/>
          <Image source={Images.logo} style={styles.logo}/>
          <Image source={Images.chat} style={styles.logo}/>

        </View>

        <View style={styles.profiles}>

          {this.loadUser()}

        </View>  

        <View style={styles.buttonsSect}>

          <TouchableOpacity >
<<<<<<< HEAD

            <View style={styles.smallButtonView}>
              <Image source = {Images.rewind} style = {styles.smallButton}/>
            </View>

=======
            <Image source = {Images.rewind} style = {styles.smallButton}/>
>>>>>>> parent of 913fc0a... Finally got background view for the buttons working propperly
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.bigButtonView}>
              <Image source = {Images.nope} style = {styles.bigButton}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.smallButtonView}>
              <Image source = {Images.boost} style = {styles.smallButton}/>
            </View>  
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.bigButtonView}>
              <Image source = {Images.like} style = {styles.bigButton}/>
            </View>  
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.smallButtonView}>
              <Image source = {Images.superLike} style = {styles.smallButton}/>
            </View>
          </TouchableOpacity>
          
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#E5E4E2",
  },
  header:{
    flex:1.5,
    height:85,
    paddingTop:25,
    flexDirection:'row',

  },
  profiles:{
    flex:20,
  },
  animatedView:{
    height:SCREEN_HEIGHT-200,
    width:SCREEN_WIDTH,
    padding:35,
    position:'absolute',
  },
  logo:{
    flex:1,
    height:null,
    width:null,
    resizeMode:'contain',    
  },
  smallButton:{
<<<<<<< HEAD
    flex:1,
    maxHeight:30,
    maxWidth:30,
    resizeMode:'center',
  },
  smallButtonView:{
    alignItems:'center',
    justifyContent:'center',
    height:40,width:40, 
    backgroundColor:'white', 
    borderRadius:40/2,
=======
    height:40,
    width:40,
    resizeMode:'contain', 
>>>>>>> parent of 913fc0a... Finally got background view for the buttons working propperly
  },
  bigButton:{
    flex:1,
    maxWidth:40,
    maxHeight:40,
    resizeMode:'center',
  },
  bigButtonView:{
    alignItems:'center',
    justifyContent:'center',
    height:55,width:55, 
    backgroundColor:'white', 
    borderRadius:55/2,
  },
  chat:{
    flex:1,
    height:null,
    width:null,
    resizeMode:'contain', 
  },

  images:{
    flex:1,
    height:null,
    width:null,
    resizeMode:'cover',
    padding:10,
    borderRadius:10,
  },
  buttonsSect:{
    flex:1.5,
    height:60,
    paddingBottom:67,
    paddingLeft:30,
    paddingRight:30,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  name:{
    textAlign:'left',
    fontWeight:'bold',
  },

  description:{
    fontStyle:'italic',
    fontSize:11,
  },

});
