import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { Images, Profiles } from './App/Themes';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
var  prevProfile= null;
var undoPressed= false;

export default class App extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
     
    }
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })
    
  }

likeFunction(yd){
  Animated.spring(this.position, {
    toValue: { x: SCREEN_WIDTH + 100, y: yd }
  }).start(() => {
    this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
      this.position.setValue({ x: 0, y: 0 })
    })
  })
  undoPressed=false;
}

dislikeFunction(yd){
  Animated.spring(this.position, {
    toValue: { x: -SCREEN_WIDTH - 100, y: yd }
  }).start(() => {
    this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
      this.position.setValue({ x: 0, y: 0 })
    })
  })
  undoPressed=false;
}

  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          this.likeFunction(gestureState.dy);
        }
        else if (gestureState.dx < -120) {
          this.dislikeFunction(gestureState.dy);
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }
  saveFunction= () => {
    prevProfile ={
      profileImage: this.state.profileImage,
      name: this.state.name,
      age: this.state.age, 
      occupation: this.state.occupation
    };
    
  }
  loadprevUser = () => {
    this.setState((prevProfile))
    undoPressed=true;
    
  }
  
 
  loadUser = () => {
    if(undoPressed===false){
    var loadedProfile = Profiles.random();
    this.state = {
      profileImage: loadedProfile.image,
      name: loadedProfile.name,
      age: loadedProfile.age,
      occupation: loadedProfile.occupation,
      
    };
  } 
  

    return (
      <Animated.View elevation={5} {...this.PanResponder.panHandlers} style={[{ transform: this.position.getTranslateTransform() }, styles.animatedView]}>


        <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <Text style={{
            borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 30,
            fontWeight: '800', padding: 10
          }}>Like</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.dislikeOpacity, position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <Text style={{
            borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 30,
            fontWeight: '800', padding: 10
          }}>Dislike</Text>
        </Animated.View>

        <Image source={this.state.profileImage} style={styles.images} />

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

          <Image source={Images.cog} style={styles.logo} />
          <Image source={Images.logo} style={styles.logo} />
          <Image source={Images.chat} style={styles.logo} />

        </View>

        <View style={styles.profiles}>
        
          {this.loadUser()}
        
        </View>

        <View style={styles.buttonsSect}>

          <TouchableOpacity onPress={()=>{this.loadprevUser()}} >

            <View elevation={5} style={styles.smallButtonView}>
              <Image source={Images.rewind} style={styles.smallButton} />
            </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.saveFunction(), this.dislikeFunction(0)}} >
            <View elevation={5} style={styles.bigButtonView}>
              <Image source={Images.nope} style={styles.bigButton} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View elevation={5} style={styles.smallButtonView}>
              <Image source={Images.boost} style={styles.smallButton} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{ this.saveFunction(), this.likeFunction(0)}} >
            <View elevation={5} style={styles.bigButtonView}>
              <Image source={Images.like} style={styles.bigButton} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View elevation={5} style={styles.smallButtonView}>
              <Image source={Images.superLike} style={styles.smallButton} />
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
    backgroundColor: "#E5E4E2",
  },
  header: {
    flex: 1.5,
    height: 85,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
  },
  profiles: {
    flex: 20,
    alignItems: 'center',
  },
  animatedView: {
    height: SCREEN_HEIGHT - 230,
    width: SCREEN_WIDTH - 40,
    paddingBottom: 10,
    position: 'absolute',
    backgroundColor: '#EBF4FA',
    borderRadius: 13,
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  smallButton: {
    flex: 1,
    maxHeight: 30,
    maxWidth: 30,
    resizeMode: 'center',
  },
  smallButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40, width: 40,
    backgroundColor: '#EBF4FA',
    borderRadius: 40 / 2,
  },
  bigButton: {
    flex: 1,
    maxWidth: 33,
    maxHeight: 33,
    resizeMode: 'center',
  },
  bigButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55, width: 55,
    backgroundColor: '#EBF4FA',
    borderRadius: 55 / 2,
  },
  chat: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },

  images: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonsSect: {
    flex: 2,
    height: 60,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10,
  },

  description: {
    fontStyle: 'italic',
    fontSize: 11,
    paddingLeft: 10,
  },

});
