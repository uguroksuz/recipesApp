import React, { Component } from 'react';
import {
  Text,
  ListView,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  BackHandler,
  Alert
} from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const defaultItemValue = {
  name: '',
  id: 0
};

export default class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      listItems: [],
      focus: false,
      text: '',
    };
  }

  renderList = () => {
    if (this.state.focus) {
      return (
        <ListView
          style={{ ...this.props.itemsContainerStyle }}
          keyboardShouldPersistTaps="always"
          dataSource={ds.cloneWithRows(this.state.listItems)}
          renderRow={this.renderItems}
        />
      );
    }
  };

  renderFlatList = () => {
    if (this.state.focus) {
      return (
        <FlatList
          style={{ ...this.props.itemsContainerStyle }}
          keyboardShouldPersistTaps="always"
          data={this.state.listItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItems(item)}
        />
      );
    }
  };

  componentDidMount = () => {
    const listItems = this.props.items;
    const defaultIndex = this.props.defaultIndex;

    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        // item: listItems[defaultIndex]
      });
    } else {
      this.setState({ listItems });
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // Alert.alert('Tıkladı', 'geri butonuna tıklandı')
    
    if (this.state.focus) {
      this.setState({focus: false});
      return true;
    }
  }

  searchedItems = searchedText => {
    var ac = this.props.items.filter(function(item) {
      return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    })
    .concat(this.props.items.filter(function(item){
      return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1 && item.name.toLowerCase().indexOf(searchedText.toLowerCase()) != 0
    }))
    
    let item = {
      id: -1,
      name: searchedText
    };

    this.setState({ listItems: ac, item: item });
    const onTextChange = this.props.onTextChange;

    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText);
      }, 0);
    }
  };

  renderItems = item => {
    return (
      <TouchableOpacity
        style={{ ...this.props.itemStyle }}
        onPress={() => {
          this.setState({ focus: false });
          setTimeout(() => {
            this.props.onItemSelect(item);
            if (this.props.resetValue) {
              this.setState({ focus: false, item: defaultItemValue });
              this.input.focus();
            }
          }, 0);
        }}
      >
        <Text style={{ ...this.props.itemTextStyle }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderListType = () => {
    return this.props.listType == 'ListView'
      ? this.renderList()
      : this.renderFlatList();
  };

  render = () => {
    return (
      <View
        keyboardShouldPersist="always"
        style={{ ...this.props.containerStyle }}
      >
        <TextInput
          ref={e => (this.input = e)}
          blurOnSubmit={false}
          underlineColorAndroid={this.props.underlineColorAndroid}
          onFocus={() => {
            this.setState({
            //   focus: true,
            //   item: defaultItemValue,
              listItems: this.props.items
            });
          }}
          onChangeText={text => {
            this.searchedItems(text);
            this.setState({focus: true, text});
            if(text.length == 0){this.setState({focus: false})}
          }}
          value={this.state.item.name}
          style={{ ...this.props.textInputStyle }}
          placeholderTextColor={this.props.placeholderTextColor}
          placeholder={this.props.placeholder}
          onSubmitEditing={()=> {
            let text = this.state.text;
            let s = this.props.items.find(function(item) {
              return item.name.toLowerCase().indexOf(text.toLowerCase()) == 0 && item.name.toLowerCase().length == text.toLowerCase().length;
            });

            if(s){
              this.props.onItemSelect(s);

              if (this.props.resetValue) {
                this.setState({ focus: false, item: defaultItemValue });
                this.input.focus();
              }
            }else{
              this.input.focus();
            }
            
          }}
        />
        {this.renderListType()}
        <Image source={require('../../assets/icons/magnifier-tool-24.png')} style={{position:'absolute', right:20, top:20}}/>
      </View>
    );
  };
}