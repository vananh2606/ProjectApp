import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react'
import { LogBox } from 'react-native';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHab1xCK7Tn2yb-ngTEpX52o2j4S2HYUQ",
  authDomain: "projectapp-a726a.firebaseapp.com",
  projectId: "projectapp-a726a",
  storageBucket: "projectapp-a726a.appspot.com",
  messagingSenderId: "529723843929",
  appId: "1:529723843929:web:62c659d9cfcea75cc71848",
  measurementId: "G-0J1E374FJP"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/add/Add';
import SaveScreen from './components/main/add/Save';
import ChatScreen from './components/main/chat/Chat';
import ChatListScreen from './components/main/chat/List';
import CommentScreen from './components/main/post/Comment';

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation} options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

              switch (routeName) {
                case 'Camera': {
                  return {
                    headerTitle: 'Camera',
                  };
                }
                case 'chat': {
                  return {
                    headerTitle: 'Chat',
                  };
                }
                case 'Profile': {
                  return {
                    headerTitle: 'Profile',
                  };
                }
                case 'Search': {
                  return {
                    headerTitle: 'Search',
                  };
                }
                case 'Feed':
                default: {
                  return {
                    headerTitle: 'Instagram',
                  };
                }
              }
            }} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Chat" component={ChatScreen} navigation={this.props.navigation} />
            <Stack.Screen name="ChatList" component={ChatListScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App