import React, { Component } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator} from 'react-native';
import SearchableDropdown from './searchable';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default class RecipeSearch extends Component{
  _isMounted = false;

  state = {
    isLoadingCategories: true,
    jsonData: [],
    categories: [],
  };

  componentDidMount(){
    this._isMounted = true;
    this.loadData();
    this.loadCategories();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  loadData(){
    axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allposts')
    .then(res => {
      const jsonData = res.data;
      if(this._isMounted){
        this.setState({ jsonData, isLoading: false,});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  loadCategories(){
    axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/allcategories')
    .then(res => {
      const categories = res.data;
      if(this._isMounted){
        this.setState({ categories, isLoadingCategories: false,});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({item}) => (
    <TouchableOpacity 
      onPress={() => this.props.navigation.navigate('RecipesByCategory', {categoryId: item.id})}
      style={styles.GridViewBox}>
      <ImageBackground source={{uri: item['image_url']}} style={styles.GridViewBlockStyle}>
        <View style={styles.overley}/>
        <Text style={styles.GridViewInsideTextItemStyle} > {item.name} </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
  
  render(){
    const { navigation } = this.props;
    const width= Dimensions.get('window').width;
    const height= Dimensions.get('window').height;
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleH1}>Dilediğinizi Arayın</Text>
          <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.closeButton}>
            <Ionicons name="md-close" size={42} color="#a4b0be" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <SearchableDropdown
            onItemSelect={ item => navigation.navigate('SingleRecipe', {recipeId: item.id} )}
            containerStyle={styles.containerStyle}
            textInputStyle={styles.textInputStyle}
            itemStyle={styles.itemStyle}
            itemTextStyle={styles.itemTextStyle}
            itemsContainerStyle={styles.itemsContainerStyle}
            items={this.state.jsonData}
            defaultIndex={0}
            placeholder="Ara"
            resetValue={true}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.conjunction}>ya da</Text>
          <Text style={styles.title}>HIZLICA KATEGORİYE GİT</Text>
        </View>
        {(this.state.isLoadingCategories) ?
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color='#a4b0be' size = {53}/>
          </View>
          :
          <FlatList
            style={styles.flatList}
            data={ this.state.categories }
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={2}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GridViewBox:{
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  GridViewBlockStyle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 10,
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  overley:{
    backgroundColor: 'rgba(0,0,0,.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flatList:{
    paddingTop: 2,
  },
  container: {
    padding: 8,
    paddingTop: 30,
    justifyContent: 'flex-start',
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleH1:{
    flex:1,
    color: '#57606f',
    fontSize: 18,
    padding: 8,
  },
  titleContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 4,
  },
  title:{
    color: '#03b898',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conjunction:{ //conjunction = Bağlaç
    color: '#a4b0be',
    paddingVertical: 2,
  },
  searchContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 53,
    left: 8,
    right: 8,
    zIndex: 53,
    maxHeight: 250
  },
  itemTextStyle:{
    color: '#747d8c'
  },
  containerStyle:{
    padding: 5,
    flex: 1,
  },
  closeButton:{
    width: 43,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
