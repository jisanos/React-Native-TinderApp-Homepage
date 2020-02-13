import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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

        <View style={styles.buttons}>
            <Image source={Images.rewind}/>
        </View>

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
    backgroundColor: 'white',
  },
  profiles:{
       
    borderRadius:10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderColor:'black',
  },
  name:{
    textAlign:'left',
    fontWeight:'bold',
  },
  description:{
    fontStyle:'italic',
    fontSize:11
  },
  buttons:{

  },
});
