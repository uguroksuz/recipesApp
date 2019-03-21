import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class Login extends Component{

  render() {
    return (
      <ImageBackground source={require('../../assets/login.jpg')} style={{width: '100%', height: '100%'}}>
        <StatusBar 
              translucent
              backgroundColor="rgba(0, 0, 0, 0)"
              animated
              barStyle="light-content"/>
        <View style={{justifyContent: "center", alignItems: 'flex-end', marginTop: 21, padding: 10}}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.goBack()}>
            <EvilIcons name="close" size={48} color="#eee" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.textTable}>1 su bardağı	Aşurelik Buğday	160	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Ayçiçek yağı	168	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Bulgur, Köftelik	110	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Bulgur, Pilavlık	138	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Erişte, Ev yapımı	80	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	İrmik	140	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Kırmızı Mercimek	170	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Kuru Fasulye	150	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Margarin, Eritilmiş	155	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Nişasta, Buğday	100	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Nohut	140	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Pirinç Calrose	158	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Pirinç Unu	120	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Pirinç, Kırık	166	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Pudra Şekeri	113	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Su	180	gr/ml</Text>
          <Text style={styles.textTable}>1 su bardağı	Süt	185	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Şehriye, Arpa	163	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Şehriye, Tel	110	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Tereyağı	165	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Toz Şeker	168	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Tuz	168	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Un	110	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Yoğurt, Ev yapımı	195	gr</Text>
          <Text style={styles.textTable}>1 su bardağı	Zeytinyağı, Sızma	154	gr</Text>
        </ScrollView>
          {/* <Image source={require('../../assets/avatar.png')} style={{width: 96, height: 96}} />
          <Text style={styles.text}>
            Oturum Aç
          </Text>
          <View style={styles.inputBox}>
            <Image source={require('../../assets/icons/mail.png')} style={styles.inputBoxImage}/>
            <TextInput placeholder={'E-posta Adresi'} placeholderTextColor={'#dddddd'} style={styles.textInput} />
          </View>
          <View style={styles.inputBox}>
            <Image source={require('../../assets/icons/key.png')} style={styles.inputBoxImage}/>
            <TextInput placeholder={'Parola'} placeholderTextColor={'#dddddd'} style={styles.textInput} />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={()=> this.props.navigation.goBack()}>
            <Text style={styles.text}>Giriş</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebook}>
            <Text style={styles.text}>Facebook ile bağlan</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
  },
  scrollView:{
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255, .1)',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 2,
    color: '#ffffff',
  },
  textTable: {
    fontSize: 14,
    // textAlign: 'center',
    margin: 0,
    padding: 7,
    color: '#fff',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
    fontSize: 22,
    marginTop: 12,
    padding: 10,
    width: '100%'
  },
  inputBoxImage: {
    width: 22,
    height: 22,
    marginRight: 22,
  },
  textInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#f57365',
    width: '100%',
    padding: 7,
    marginTop: 22,
  },
  facebook: {
    backgroundColor: '#45629e',
    width: '100%',
    padding: 7,
    marginTop: 72,
  }
});
