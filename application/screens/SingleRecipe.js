import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import axios from 'axios';
import { LinearGradient } from 'expo';


export default class SingleRecipe extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      isLoading: true,
      jsonData: [],
    };
  }

  componentDidMount(){
    this._isMounted = true;
    this.loadData();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  loadData(){
    const { navigation } = this.props;
    const recipeId = navigation.getParam('recipeId', 'NO-ID');
    const url = 'https://tarifbulutu.com/wp-json/wp/v2/posts/' + recipeId + '?_embed';
    axios.get(url)
    .then(res => {
      if(this._isMounted){
        const jsonData = res.data;
        this.setState({ jsonData, isLoading: false});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){

    const HEADER_MAX_HEIGHT = 207;
    const HEADER_MIN_HEIGHT = 81;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

      // const title = this.state.jsonData['title']['rendered'];
      // const imageUrl = this.state.jsonData['_embedded']['wp:featuredmedia'][0]['source_url'];
      // const authorName = this.state.jsonData['_embedded']['author'][0]['name'];
      // const authorImage = this.state.jsonData['_embedded']['author'][0]['avatar_urls']['24'];
      // const htmlContent = this.state.jsonData['content']['rendered'];
    

      const htmlStyles = {
        'recipeInfoFront': { color: '#831c51', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', },
        'col-md-4' : {justifyContent: 'center', alignItems: 'center', margin: 5, paddingTop: 15,},
        // 'recipeContent' : {fontSize: 16, color:'#747d8c'}
      }
      const htmlTagsStyles = {
        h3 : {color: '#831c51', borderBottomWidth: 1, borderBottomColor: '#831c51', fontSize: 14,},
        h2 : {color: '#831c51'},
        li : {color: '#747d8c'},
        p  : {fontSize: 16, color:'#747d8c', paddingVertical: 12,}
      }	
  
    if(this.state.isLoading){
      return(
        <ImageBackground 
        source={require('../../assets/recipesBg.jpg')}
        style={{ flex: 1, padding: 20, alignContent: "center", justifyContent: "center" }}>
          <View style={styles.container}>
            <ActivityIndicator color='#dfe4ea' size = {53}/>          
          </View>
        </ImageBackground>
      );
    }
    
    return (
      <ImageBackground source={require('../../assets/recipesBg.jpg')} style={{width: '100%', height: '100%',}}>
        <StatusBar 
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          animated
          barStyle="light-content"/>
        <Animated.View style={{height: headerHeight, backgroundColor: '#747d8c', position: 'absolute', top: 0, left: 0, right:0, bottom:0, zIndex:53}}>
          <ImageBackground source={{uri: this.state.jsonData['_embedded']['wp:featuredmedia'][0]['source_url']}} style={{flex:1, justifyContent: 'flex-end',}} blurRadius={1.2}>
          <LinearGradient
          colors={['rgba(0,0,0,.7)', 'rgba(0,0,0,0)']}
          style={{
          flexDirection: 'row',
          width: '100%',
          height: 81,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 41,
          paddingBottom: 20,
          paddingHorizontal: 20,}}>    
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', width:60, height: 60}}>
              <TouchableOpacity onPress={ () => this.props.navigation.goBack()} 
              style={{width: 40, }}>
                <Ionicons name="ios-arrow-back" size={32} color="#fff" />
              </TouchableOpacity>
            </View>        
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', height: 60}}>
              {/* <Text style={{color: "#3dcc8e", fontSize: 22, fontWeight: 'bold',}}>Tarif Bulutu</Text> */}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50, height: 60}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeSearch')}>
                <Ionicons name="ios-search" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          
          </LinearGradient>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Animated.Text 
              style={{
              fontWeight: 'bold', 
              fontSize: 24, 
              color: 'white',
              opacity: textOpacity,}}>
              {this.state.jsonData['title']['rendered']}
            </Animated.Text>
          </View>
        </ImageBackground>
        </Animated.View>
        <ScrollView 
          style={{backgroundColor: '#ffffff',}}
          
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY}}}])}>
          <View style={{backgroundColor: '#747d8c', flexDirection: 'row', paddingTop: HEADER_MAX_HEIGHT}}>
            <View style={{justifyContent: 'center', marginHorizontal: 18}}>
              <Image source={{uri: this.state.jsonData['_embedded']['author'][0]['avatar_urls']['24']}} style={{width: 48, height: 48, borderRadius: 48, margin: 5}}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>
                {this.state.jsonData['title']['rendered']}
              </Text>
              <Text style={{color: 'white'}}>{this.state.jsonData['_embedded']['author'][0]['name']}</Text>
            </View>
          </View>
          <View style={{marginHorizontal: 20}}>
            <HTML
            html={this.state.jsonData['content']['rendered']}
            classesStyles={htmlStyles}
            tagsStyles={htmlTagsStyles}
            imagesMaxWidth={Dimensions.get('window').width}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
  
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});