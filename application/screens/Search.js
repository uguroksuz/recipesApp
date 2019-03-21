import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import SearchableDropdown from './searchable';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {MaterialIcons} from '@expo/vector-icons';

export default class Search extends Component {
  _isMounted = false;

  constructor(){
    super()
    this.state = {
      jsonData: [],
      totalPage: 1,
      selectedIngredients: [],
    }
  }
  componentDidMount(){
    this._isMounted = true;
    this.jsonLoad();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  jsonLoad(){
    // Make a request for a user with a given ID
    axios.get('https://tarifbulutu.com/wp-json/tbplugin/v1/ingredients')
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

  _setSelectedIngredients(item){
    if(this.state.selectedIngredients.find(x => x.id === item.id)){
      ToastAndroid.show('Malzeme zaten seçili', ToastAndroid.SHORT);
    } else{
      this.setState(state => {
        const list = state.selectedIngredients.push(item);
        return {
          list
        };
      });
    } 
  }

  _removeItem(item){
    this.setState({selectedIngredients: this.state.selectedIngredients.filter(function(el) { return el.id != item; })});
  }

  render() {
    const width= Dimensions.get('window').width;
    const height= Dimensions.get('window').height;
    return (
      <ImageBackground 
          source={require('../../assets/bg.jpg')}
          style={{height: height, padding: 20, paddingTop: 21, }}>
        
        <View style={{height: height-101, paddingTop:20}}>
          <SearchableDropdown
            onItemSelect={item => this._setSelectedIngredients(item)}
            containerStyle={{ padding: 5 }}
            textInputStyle={{
              backgroundColor:'#fff',
              padding: 12,
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 5,
              fontSize: 18,
              color: '#747d8c',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#fff',
              borderBottomColor:'#eee',
              borderBottomWidth: 1,
            }}
            itemTextStyle={{ color: '#747d8c' }}
            itemsContainerStyle={{ 
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
            maxHeight: 250}}
            items={this.state.jsonData}
            defaultIndex={0}
            placeholder="Malzeme Ara"
            resetValue={true}
            underlineColorAndroid="transparent"
          />
          <View style={{width: '100%' , alignItems: 'center', paddingVertical: 8}}>
            <MaterialIcons name="kitchen" color="#fff" size={53}/>
          </View>
          <View style={{
            padding: 12,
            paddingTop: 53,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',}}>
            
            {this.state.selectedIngredients.length === 0 ? 
            
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
            <Image source={require('../../assets/icons/magnifier-tool-64.png')} style={{width: 53, height: 53 , margin: 15}} />
            <Text style={{color: '#a4b0be', fontWeight: 'bold' }}>Mutfakta Neler Var?</Text>
            <Text style={{color: '#a4b0be'}}>Malzemelerinize göre tarif bulun.</Text>
          </View> :

            this.state.selectedIngredients.map((x)=> {
              return(
              <View key={x.id} style={{
                backgroundColor: '#fff',
                paddingHorizontal: 7,
                paddingVertical: 3,
                margin: 5,
                borderRadius: 20,
                borderColor: '#ddd',
                overflow: 'hidden',
                justifyContent: 'center',
                height: 34,
                flexDirection: 'row',
                alignItems: 'center',}}>
                <Text style={{color:'#a4b0be',}}>{x.name}</Text>
                <TouchableOpacity 
                style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#a4b0be', margin: 3, padding: 2, borderRadius: 20}}
                onPress={() => this._removeItem(x.id)}>
                  <Icon name="close" color='#fff' />
                </TouchableOpacity>
              </View>
              )
            })}
          </View>
        </View>
        <View style={{height: 70, justifyContent: 'flex-end',}}>
          <TouchableOpacity onPress={() => {
            (this.state.selectedIngredients.length >= 3) 
            ?
            this.props.navigation.navigate('SearchResult', {ingredients: this.state.selectedIngredients})
            :
            ToastAndroid.show('Lütfen en az 3 malzeme seçin', ToastAndroid.SHORT);
          }} style={{}}>
            <View style={{backgroundColor: '#03b898', height: 60, width: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Tarif Bul</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </ImageBackground>
    );
  }
}
