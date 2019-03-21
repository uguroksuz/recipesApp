import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./application/screens/HomeScreen";
import Recipes from "./application/screens/Recipes";
import Recipe from "./application/screens/Recipe";
import Login from "./application/screens/Login";
import Search from "./application/screens/Search";
import MenuOftheday from "./application/screens/MenuOftheday";
import SearchResult from "./application/screens/SearchResult";
import SingleRecipe from "./application/screens/SingleRecipe";
import RecipeSearch from "./application/screens/RecipeSearch";
import RecipesByCategory from "./application/screens/RecipesByCategory";


const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Recipes: {
      screen: Recipes,
    },
    Search: {
      screen: Search,
    },
    MenuOftheday: {
      screen: MenuOftheday,
    },
    Login: {
      screen: Login,
    },
    Recipe: {
      screen: Recipe,
    },
    SearchResult: {
      screen: SearchResult,
    },
    SingleRecipe: {
      screen: SingleRecipe,
    },
    RecipeSearch: {
      screen: RecipeSearch,
    },
    RecipesByCategory: {
      screen: RecipesByCategory,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}