import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Images, Profiles } from './App/Themes';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class App extends React.Component {
  constructor() {
    super();

    var haroldProfile = Profiles.harold;
    this.state = {
      profileImage: haroldProfile.image,
      name: haroldProfile.name,
      age: haroldProfile.age,
      occupation: haroldProfile.occupation
    };
  }

  loadUser=()=>{
    return(
     <Animated.View style = {styles.animatedView}>

      <Image source={this.state.profileImage} style={styles.images}/>

      <Text style={styles.name}>
        {this.state.name}, 65
      </Text>
      <Text style={styles.description}>GOD HIMSELF</Text>
    </Animated.View>    
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>

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
