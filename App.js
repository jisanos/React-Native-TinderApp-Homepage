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
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder:(evt, gestureState) =>true,
      onPanResponderMove:(evt, gestureState) =>{
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt, gestureState)=>{

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

          <Image source={Images.logo} style={styles.logo}/>

        </View>

        <View style={styles.profiles}>

          {this.loadUser()}

        </View>  

        <View style={styles.buttonsSect}>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    height:85,
  },
  profiles:{
    flex:1,
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
  images:{
    flex:1,
    height:null,
    width:null,
    resizeMode:'cover',
    padding:10,
    borderRadius:10,
  },
  buttonsSect:{
    height:60,
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
