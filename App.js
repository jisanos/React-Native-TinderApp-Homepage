import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Images, Profiles } from './App/Themes';

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

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.profiles}>
          <Image source={this.state.profileImage} />

          <Text style={styles.name}>
            {this.state.name}, 65
          </Text>

          <Text style={styles.description}>GOD HIMSELF</Text>
        </View>  

        <TouchableOpacity style={styles.touchable}>

        <Image source={Images.rewind} style={styles.imageButtons}/>

        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  profiles:{
       
    borderRadius:10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor:'black',
  },
  name:{
    textAlign:'left',
    fontWeight:'bold',
  },
  description:{
    fontStyle:'italic',
    fontSize:11,
  },
  touchable:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    width:100,
    height:100,
    backgroundColor:"white",
    borderRadius:50,
  },
  buttons:{
    backgroundColor:'white',
    width:60,
    height:60,
    borderRadius:60/2,
  },
  imageButtons:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:50,
    height:50,
  },
});
