import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Alert,
    StyleSheet,
    Image,
    ActivityIndicator,
    ImageBackground,
    FlatList
  } from 'react-native';
  import axios from 'axios';
  import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

  export default class SearchResult extends Component {
    _isMounted = false;

    constructor(){
      super()
      this.state = {
        jsonData: [],
        isLoading: true,
      }
    }

    componentDidMount() {
      this._isMounted= true;
      this.handleLoad();
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    handleLoad(){
        const { navigation } = this.props;
        const ingredients = navigation.getParam('ingredients', 'NO-ID');
        const url = 'https://tarifbulutu.com/wp-json/tbplugin/v1/searchedRecipe?m=' + ingredients.map(r => r.id);
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

    renderSeparator = () => {
        return ( <View style={{height: 0, width: "86%", backgroundColor: "#CED0CE", marginLeft: "14%",}}/> );
      };

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('SingleRecipe', {recipeId: item.id})}
        style={styles.itemContent}>
          <View style={styles.itemImageContent}>
            <Image 
            style={{width: 50, height: 50}}
            source={{uri: item.image_url}} />
          </View>
          <View style={styles.itemInfoContent}>
            <Text style={styles.itemTitle} >{item.title}</Text>
            <Text style={{flex: 1,}}>
              <Text style={styles.searchedIngredients} >{item.searchedIngredients.map(x => x + ', ')}</Text>
              <Text style={styles.otherIngredients} >{item.otherIngredients.map(x => x + ', ' )}</Text>
            </Text>
          </View>            
        </TouchableOpacity>
    );

    render(){

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

      return(
        <ImageBackground 
          source={require('../../assets/bg.jpg')}
          style={styles.container}>
          <View 
          style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingVertical: 21,
          paddingHorizontal: 15,}}>        
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width:40, height: 60}}>
              <TouchableOpacity onPress={ () => this.props.navigation.goBack()} style={{width: 40, justifyContent: 'flex-start',}}>
                <Ionicons name="ios-arrow-back" size={32} color="#fff" />
              </TouchableOpacity>
            </View>        
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', paddingBottom: 12}}>Eşleşen Tarifler</Text>
              <MaterialCommunityIcons name="pot-mix" color='#fff' size={65}  />
            </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', width: 40, height: 60,}}>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('RecipeSearch')} style={{width: 40, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                <Ionicons name="ios-search" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {(this.state.jsonData.length < 1) ?
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <AntDesign name="frowno" color='#a4b0be' size={53} />
            <Text style={{color: '#a4b0be', fontSize: 18, fontWeight: 'bold', padding: 12}}>
              Uygun tarif bulunamadı
            </Text>
          </View>
          : 
          <FlatList
            style={{flex: 1, marginTop: 18, borderRadius: 10, margin: 8,
              // backgroundColor: '#fff',
              // shadowColor: "#a4b0be",
              // shadowOffset: {
              //   width: 0,
              //   height: 7,
              // },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              // elevation: 17,
           }}
            data={this.state.jsonData}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent = {() => <View style = {{ height: 1,backgroundColor: 'rgba(0,0,0,0)'}} /> }
          />
          }
          
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingTop: 21,
    },
    itemContent: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    itemImageContent: {
      width: 50,
      height: 50,
    },
    itemInfoContent: {
      flex:1,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#7f8fa6',
    },
    searchedIngredients:{
      fontWeight: 'bold',
      color: '#03b898',
    },
    otherIngredients: {
      color: '#bbb',
    },
  });