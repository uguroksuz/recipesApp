import React, { PureComponent  } from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList, StatusBar, ActivityIndicator, TouchableOpacity,} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';


export default class Recipes extends PureComponent {
  _isMounted = false;

  state = {
    jsonData: [],
    searchList: [],
    isLoading: true,
    page:1,
    totalPage: 1,
    fetching_from_server: false,
    modalVisible: false,
    searchBarDisplay: false,
  };
  
  componentDidMount(){
    this._isMounted = true;
    this.handleLoad();
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
   
  handleLoad(){
    // Make a request for a user with a given 
    const url = 'https://tarifbulutu.com/wp-json/wp/v2/posts?_embed&page=' + this.state.page;
    axios.get(url)
    .then(res => {
      const jsonData = res.data;
      const totalPage = res.headers["x-wp-totalpages"];
      if(this._isMounted){
        this.setState({ jsonData, isLoading: false, totalPage: totalPage});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  loadMoreData = () =>
  {
    if (this.state.page == this.state.totalPage) {
      this.setState({fetching_from_server: false});
    }else {
      this.setState({ fetching_from_server: true }, () =>
      {
        clearTimeout(this.timer);        
        this.timer = -1;        
        this.timer = setTimeout(() =>
        {
          // Make a request for a user with a given ID
              this.state.page++;
              const url = 'https://tarifbulutu.com/wp-json/wp/v2/posts?_embed&page=' + this.state.page;
              axios.get(url)
              .then(res => {
                const jsonData = res.data;
                if(this._isMounted){
                  this.setState({ jsonData: [ ...this.state.jsonData, ...jsonData ], fetching_from_server: false });                  
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            }, 1500); 
        });
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({item}) => (
    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate('Recipe', {
      id: item.id,
      title: item.title.rendered,
      imageUrl: item["_embedded"]["wp:featuredmedia"][0]["link"],
      authorName: item._embedded.author[0].name,
      authorImage: item._embedded.author[0].avatar_urls[48],
      recipeDescription: item.content.rendered,
    })} 
    style={{
    marginHorizontal: 12,
    marginVertical: 8, 
    borderRadius: 10,
    // borderColor: '#a4b0be',
    // borderWidth: 1,
    overflow: 'hidden', 
    shadowColor: "#a4b0be",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1,}}>
      <ImageBackground source={{uri: item["_embedded"]["wp:featuredmedia"][0]["link"]}} style={{width: '100%', height: 237, justifyContent: 'flex-end'}} >
        <View style={{position: 'absolute', left:0, right: 0, top:0, bottom:0, backgroundColor:'rgba(0,0,0,.15)'}}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 3}}>
            {item.title.rendered}
          </Text>
        </View>
   
        <LinearGradient
          // colors={['#4c669f', '#3b5998', '#192f6a']}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.7)']}
          style={{ flexDirection: 'row',}}>
          <View style={{justifyContent: 'center', marginHorizontal: 12}}>
            <Image source={{uri: item._embedded.author[0].avatar_urls[48]}} style={{width: 48, height: 48, borderRadius: 48, margin: 5}}/>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <Text style={{fontWeight: 'bold', fontSize: 16, color:'#fff'}}>
              {item.title.rendered}
            </Text> */}
            <Text style={{color:'#fff', fontWeight: 'bold',}}>{item._embedded.author[0].name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  renderFooter() {
    return (
      <View style={{padding: 20}}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="#a4b0be" style={{ marginLeft: 8 }} />
        ) : null}
      </View>
    );
  }

  render(){
    // console.warn(this.state.per);
    if (this.state.isLoading) {
      return (
        <ImageBackground 
        source={require('../../assets/recipesBg.jpg')}
        style={{ flex: 1, padding: 20, alignContent: "center", justifyContent: "center" }}>
        <StatusBar 
            translucent
            backgroundColor="rgba(0, 0, 0, 0)"
            animated
            barStyle="light-content"/>
          <ActivityIndicator color='#dfe4ea' size = {53}/>
        </ImageBackground>
      )
    }

    return (
    <ImageBackground 
        source={require('../../assets/recipesBg.jpg')}
        style={{flex: 1,}}>
      <StatusBar 
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
        animated
        barStyle="light-content"/>
      <LinearGradient
      colors={['#dfe4ea','#fff','#fff']}
      style={styles.headerGradient}>
        <View style={{display: !this.state.searchBarDisplay ? 'flex' : 'none', flex: 1, flexDirection: 'row'}}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', width:60, height: 60}}>
            <TouchableOpacity onPress={ () => this.props.navigation.goBack()} style={{width: 40}}>
              <Ionicons name="ios-arrow-back" size={32} color="#a4b0be" />
            </TouchableOpacity>
          </View>        
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', height: 60}}>
            <Image source={require('../../assets/logo.png')} style={{width: 153}} resizeMode="contain" />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50, height: 60}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeSearch')}>
              <Ionicons name="ios-search" size={32} color="#a4b0be" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        style={{paddingTop: 15, backgroundColor: '#dfe4ea', zIndex: 3 }}
        data={this.state.jsonData}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent = {() => <View style = {{ height: 1,backgroundColor: 'rgba(0,0,0,0)'}} /> }
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent = { this.renderFooter.bind( this ) }
        // onRefresh={this.handleRefresh}
        // refreshing={this.state.refreshing}
        onEndReachedThreshold={1}
        onEndReached={this.loadMoreData}        
      />
    </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  headerGradient:{
    // backgroundColor:'#fff',
    flexDirection: 'row',
    width: '100%',
    height: 81,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 41,
    paddingBottom: 20,
    paddingHorizontal: 20,
    // borderBottomColor: '#03b898',
    // borderBottomWidth: 3,
    // shadowColor: "#a4b0be",
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 3,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer:{
    width: '100%',
  },
  textInputStyle:{
    backgroundColor:'#fff',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    fontSize: 18,
    color: '#747d8c',
  },
  itemStyle:{
    padding: 10,
    marginTop: 2,
    backgroundColor: '#fff',
    borderBottomColor:'#eee',
    borderBottomWidth: 1,
  },
  itemsContainerStyle:{
    paddingHorizontal: 12, 
    backgroundColor: '#fff', 
    shadowColor: '#000', 
    shadowOpacity: .29, 
    shadowRadius: 5, 
    elevation:3, 
    position: 'absolute',
    zIndex: 53,
    left: 8,
    right: 8,
    top: 53,
    maxHeight: 250
  },
  itemTextStyle:{
    color: '#747d8c'
  },
  containerStyle:{
    padding: 5,
    flex:1,
  },
});