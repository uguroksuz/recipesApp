
import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default class HomeScreen extends Component {

  componentDidMount(){
    //Alert.alert("Açıldı");
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/background.jpg')}  style={styles.container}>
      <StatusBar 
            translucent
            backgroundColor="rgba(0, 0, 0, 0)"
            animated
            barStyle="light-content"/>
      <View style={styles.rowOne}>
        <Image source={require('../../assets/t_logo.png')} style={styles.logo} />
        <Text style={{color:'#ffffff', fontSize: 14}}>tarifbulutu.com</Text>
      </View>
      <View style={styles.rowTwo}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Recipes')}
          activeOpacity={.5} 
          style={styles.menuButton}>
          {/* <MaterialCommunityIcons name="food" size={32} color="#ffffff" /> */}
          <Image source={require('../../assets/icons/recipe-book.png')} style={{width: 48, height: 48, marginRight: 10,}} />
          <View>
            <Text style={styles.menuButtonText}>Keşfet</Text>
            <Text style={styles.menuButtonSubText}>Tüm tarifleri görüntüle</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Search')}
          activeOpacity={.5}
          style={styles.menuButton}>
          {/* <MaterialCommunityIcons name="food-fork-drink" size={32} color="#ffffff" /> */}
          <Image source={require('../../assets/icons/pot.png')} style={{width: 48, height: 48, marginRight: 10,}} />
          <View>
            <Text style={styles.menuButtonText}>Ne Pişirebilirim?</Text>
            <Text style={styles.menuButtonSubText}>Malzemeye göre tarif bul</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('MenuOftheday')}
          activeOpacity={.5} 
          style={styles.menuButton}>
          {/* <MaterialCommunityIcons name="food-variant" size={32} color="#ffffff" /> */}
          <Image source={require('../../assets/icons/cooking.png')} style={{width: 48, height: 48, marginRight: 10,}} />
          <View>
            <Text style={styles.menuButtonText}>Bugün Ne Pişirsem?</Text>
            <Text style={styles.menuButtonSubText}>Telfonu salla menü gelsin</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.rowThree}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Login')}
          activeOpacity={.5} style={styles.userLogin}>
          <AntDesign  name="login" size={28} color="#03b898" />
          <Text style={{color: "#03b898", marginLeft: 10, fontSize: 18,}}>tarifbulutu.com</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
  },
  container: {
    flex: 2,
    paddingTop: 21,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowOne:{
    // backgroundColor: 'navy',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowTwo:{
    // backgroundColor: 'yellow',
    width: '100%',
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rowThree:{
    // backgroundColor: 'navy',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuButton: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#03b898',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  menuButtonText:{
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  menuButtonSubText: {
    color: '#ffffff',
    fontSize: 12,
  },
  logo: {
    marginVertical: 12,
  },
  userLogin: {
    flexDirection: 'row',
    padding: 20,
    borderTopColor: '#03b898',
    borderTopWidth: 1,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
