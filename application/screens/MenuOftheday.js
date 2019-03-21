import React, { Component } from 'react';
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid, Vibration, ActivityIndicator, Alert} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ShakeEvent } from './ShakeEvent';
import axios from 'axios';

export default class MenuOftheday extends Component{
  _isMounted = false;

  constructor(){
    super()
    this.state = {
      soupPostsId: [],
      MainCoursePostsId: [],
      MainCourseTwoPostsId: [],
      DessertPostsId: [],
      randomSoup: [],
      randomMainCourse: [],
      randomMainCourseTwo: [],
      randomDessert: [],
      loadingStatus: true,
      shakeTime: 1,
    }
  }

  //https://tarifbulutu.com/wp-json/tbplugin/v1/allpostsid
  //https://tarifbulutu.com/wp-json/wp/v2/posts/{post_id}
  //Kaynak --> https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
  // -- Kategori id bigileri --
  // Çorbalar = 645 // Şerbetli Tatlılar = 665 // Sütlü Tatlılar = 663 // Tatlılar = 654 // Salatalar = 646 // Ana Yemekler = 647

  componentDidMount() {
    this._isMounted = true;

    // Çorbalar Katergorisindeki yazıların id'leri #Kategori id 645
    function getSoup() { return axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allpostsid/645'); }
    // Ara Yemekler Katergorisindeki yazıların id'leri #Kategori id 647
    function getMainCourse() { return axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allpostsid/647'); }
    // Ana Yemekler Katergorisindeki yazıların id'leri #Kategori id 647
    function getMainCourseTwo() { return axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allpostsid/647'); }
    // Tatlılar Katergorisindeki yazıların id'leri #Kategori id 654
    function getDessert() { return axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allpostsid/654'); }
    //Tüm ID leri çekiyorum
    axios.all([getSoup(), getMainCourse(), getMainCourseTwo(), getDessert()])
    .then(axios.spread((a,b,c,d) => {
      if(this._isMounted){
        this.setState({soupPostsId:a.data, MainCoursePostsId: b.data, MainCourseTwoPostsId: c.data, DessertPostsId: d.data, loadingStatus: false });
        this._randomRecipes();
      } 
    })).catch(function (error) { console.log(error); });

    // TODO: Düzenlemeler Yapılacak
       
    ShakeEvent.addListener(() => {
      const currentTime = new Date().getSeconds();
      if(Math.abs(this.state.shakeTime - currentTime)){
        Vibration.vibrate(100)
        this._randomRecipes();
      }
      this.setState({shakeTime: currentTime});
    });
    
     
  }

  //Rastgele Çorba ###########
  _randomSoup(){
    let randomSoupId = this.state.soupPostsId[Math.floor((Math.random() * this.state.soupPostsId.length))];
    axios.get('https://tarifbulutu.com/wp-json/wp/v2/posts/'+ randomSoupId + '?_embed')
    .then(res => {
      if(this._isMounted){
        let jsonData = {
          id: res.data["id"],
          imageUrl: res.data["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["thumbnail"]["source_url"],
          title: res.data["title"]["rendered"],
          ingredients: res.data["malzemeler"]
        }
        this.setState({randomSoup: jsonData});
      }
    })
    .catch(function (error) { console.log(error); });
  }
  //Rastgele Ara Yemek ###########
  _randomMainCourse(){
    let randomMainCourseId = this.state.MainCoursePostsId[Math.floor((Math.random() * this.state.MainCoursePostsId.length))];
    axios.get('https://tarifbulutu.com/wp-json/wp/v2/posts/'+ randomMainCourseId + '?_embed')
    .then(res => {
      if(this._isMounted){
        let jsonData = {
          id: res.data["id"],
          imageUrl: res.data["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["thumbnail"]["source_url"],
          title: res.data["title"]["rendered"],
          ingredients: res.data["malzemeler"]
        }
        this.setState({randomMainCourse: jsonData});
      }
    })
    .catch(function (error) { console.log(error); });
  }
  //Rastgele Ana Yemek ###########
  _randomMainCourseTwo(){
    let randomMainCourseTwoId = this.state.MainCourseTwoPostsId[Math.floor((Math.random() * this.state.MainCourseTwoPostsId.length))];
    axios.get('https://tarifbulutu.com/wp-json/wp/v2/posts/'+ randomMainCourseTwoId + '?_embed')
    .then(res => {
      if(this._isMounted){
        let jsonData = {
          id: res.data["id"],
          imageUrl: res.data["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["thumbnail"]["source_url"],
          title: res.data["title"]["rendered"],
          ingredients: res.data["malzemeler"]
        }
        this.setState({randomMainCourseTwo: jsonData});
      }
    })
    .catch(function (error) { console.log(error); });
  }
  //Rastgele Tatlı ###########
  _randomDessert(){
    let randomDessertId = this.state.DessertPostsId[Math.floor((Math.random() * this.state.DessertPostsId.length))];
    axios.get('https://tarifbulutu.com/wp-json/wp/v2/posts/'+ randomDessertId + '?_embed')
    .then(res => {
      if(this._isMounted){
        let jsonData = {
          id: res.data["id"],
          imageUrl: res.data["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["thumbnail"]["source_url"],
          title: res.data["title"]["rendered"],
          ingredients: res.data["malzemeler"]
        }
        this.setState({randomDessert: jsonData});
      }
    })
    .catch(function (error) { console.log(error); });
  }
  
  // Rastgele Yemek Tarifleri
  _randomRecipes(){
    this._randomSoup();
    this._randomMainCourse();
    this._randomMainCourseTwo();
    this._randomDessert();
  }

  componentWillUnmount() {
    this._isMounted = false;
    ShakeEvent.removeListener();
  }

  render() {
    if(this.state.loadingStatus){
      return(
        <ImageBackground 
        source={require('../../assets/bg.jpg')}
        style={{ flex: 1, paddingTop:21, alignContent: "center", justifyContent: "center" }}>
          <View style={{justifyContent: 'flex-start',  alignItems: 'center', height: 150}}>
            <View style={{flexDirection: 'row', paddingHorizontal: 8,}}>
              <TouchableOpacity onPress={ () => this.props.navigation.goBack()} style={{width: 40, justifyContent: 'center', alignItems: 'center',}}>
                <Ionicons name="ios-arrow-back" size={32} color="#fff" />
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/icons/vibrate.png')} style={{width: 53, height: 53 , margin: 15}} />
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeSearch')} style={{width: 40, justifyContent: 'center', alignItems: 'center',}}>
                <Ionicons name="ios-search" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={{color: '#fff', fontWeight: 'bold' }}>Menü Oluştur</Text>
            <Text style={{color: '#eee'}}>Menü için telefonu sallayın.</Text>
          </View>
          <View style={styles.container}>
            <ActivityIndicator color='#2ac9b6' size = {53}/>          
          </View>
        </ImageBackground>
      )
    }      
    return(
      <ImageBackground 
          source={require('../../assets/bg.jpg')}
          style={{flex: 1, paddingTop: 21,}}>
        <View style={{justifyContent: 'flex-start',  alignItems: 'center', height: 150}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 8,}}>
            <TouchableOpacity onPress={ () => this.props.navigation.goBack()} style={{width: 40, justifyContent: 'center', alignItems: 'center',}}>
              <Ionicons name="ios-arrow-back" size={32} color="#fff" />
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../assets/icons/vibrate.png')} style={{width: 53, height: 53 , margin: 15}} />
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeSearch')} style={{width: 40, justifyContent: 'center', alignItems: 'center',}}>
              <Ionicons name="ios-search" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{color: '#fff', fontWeight: 'bold' }}>Menü Oluştur</Text>
          <Text style={{color: '#eee'}}>Menü için telefonu sallayın.</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.listItem}>
            <View style={styles.imageContent}>
              <View style={styles.imageWrapper}>
                {(this.state.randomSoup == "")?<Image
                  source={require("../../assets/noImage.png")} 
                  style={styles.image}/>
                 :<Image
                  source={{uri:this.state.randomSoup["imageUrl"]}} 
                  style={styles.image}/>}
              </View>
            </View>
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.titleContent}
                onPress={()=>{this.props.navigation.navigate('SingleRecipe',{recipeId: this.state.randomSoup["id"]})}}>
                <Text style={styles.titleText}>{(this.state.randomSoup == "")? '...' : this.state.randomSoup["title"]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.singleReload} onPress={ () => this._randomSoup()}>
              <MaterialCommunityIcons name="reload" size={32} color="#d8d8d7" />
            </TouchableOpacity>            
          </View>
          <View style={styles.listItem}>
            <View style={styles.imageContent}>
              <View style={styles.imageWrapper}>
                {(this.state.randomMainCourse == "")?<Image
                  source={require("../../assets/noImage.png")} 
                  style={styles.image}/>
                 :<Image
                  source={{uri:this.state.randomMainCourse["imageUrl"]}} 
                  style={styles.image}/>}
              </View>
            </View>
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.titleContent}
                onPress={()=>{this.props.navigation.navigate('SingleRecipe',{recipeId: this.state.randomMainCourse["id"]})}}>
                <Text style={styles.titleText}>{(this.state.randomMainCourse == "")? '...' : this.state.randomMainCourse["title"]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.singleReload} onPress={() => this._randomMainCourse()}>
              <MaterialCommunityIcons name="reload" size={32} color="#d8d8d7" />
            </TouchableOpacity>        
          </View>
          <View style={styles.listItem}>
            <View style={styles.imageContent}>
              <View style={styles.imageWrapper}>
                {(this.state.randomMainCourseTwo == "")?<Image
                  source={require("../../assets/noImage.png")} 
                  style={styles.image}/>
                 :<Image
                  source={{uri:this.state.randomMainCourseTwo["imageUrl"]}} 
                  style={styles.image}/>}
              </View>
            </View>
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.titleContent}
                onPress={()=>{this.props.navigation.navigate('SingleRecipe',{recipeId: this.state.randomMainCourseTwo["id"]})}}>
                <Text style={styles.titleText}>{(this.state.randomMainCourseTwo == "")? '...' : this.state.randomMainCourseTwo["title"]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.singleReload} onPress={() => this._randomMainCourseTwo()}>
              <MaterialCommunityIcons name="reload" size={32} color="#d8d8d7" />
            </TouchableOpacity>            
          </View>
          <View style={styles.listItem}>
            <View style={styles.imageContent}>
              <View style={styles.imageWrapper}>
                {(this.state.randomDessert == "")?<Image
                  source={require("../../assets/noImage.png")} 
                  style={styles.image}/>
                 :<Image
                  source={{uri:this.state.randomDessert["imageUrl"]}} 
                  style={styles.image}/>}
              </View>
            </View>
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.titleContent}
                onPress={()=>{this.props.navigation.navigate('SingleRecipe',{recipeId: this.state.randomDessert["id"]})}}>
                <Text style={styles.titleText}>{(this.state.randomDessert == "")? '...' : this.state.randomDessert["title"]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.singleReload} onPress={() => this._randomDessert()}>
              <MaterialCommunityIcons name="reload" size={32} color="#d8d8d7" />
            </TouchableOpacity>        
          </View>
          
        </View>
        <View style={{ height: 60, alignItems: 'center',}}>
          <TouchableOpacity 
            style={{flexDirection: 'row', backgroundColor: "#3dcc8e", height:50, width: "90%", justifyContent: 'center', alignItems: 'center',}} 
            onPress={() => this._randomRecipes()}>
            <MaterialCommunityIcons name="reload" size={32} color="#ffffff" />
            <Text style={{color: "#fff", fontSize: 16, fontWeight: 'bold', paddingHorizontal: 8,}}>Değiştir</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
            style={{backgroundColor: "#03b898", height: 60, width: "50%", justifyContent: 'center', alignItems: 'center',}}
            onPress={()=> ToastAndroid.show('Lütfen giriş yapın.', ToastAndroid.SHORT)}>
            <Feather name="save" size={32} color="#ffffff" />
            <Text style={{color: "#fff", fontSize: 12}}>Kaydet</Text>
          </TouchableOpacity> */}
        </View>        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#fff',
  },
  listItem: {
    flex: 1, 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: .29,
    shadowRadius: 5,
    elevation:1,

  },
  imageContent: {
    width: 80, 
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width:70,
    height:70,
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  image: {
    width: 70, 
    height: 70,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  titleContent: {
    flex:1,
    paddingLeft: 20,
    //paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContent: {
    flex:3,
    paddingLeft: 20,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#7f8fa6',
  },
  subTitleText: {
    marginTop: 7,
    color: '#a3a4a5',
  },
  singleReload: {
    justifyContent: 'center',
    alignItems: 'center',
    width:42,
  }

});
