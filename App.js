import React, { useState, useEffect } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const store = createStore(rootReducer, applyMiddleware(thunk));

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
};

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainNavigation';
import SaveScreen from './screens/SaveScreen';
import CommentsScreen from './screens/CommentsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddScreen from './screens/AddScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ListLikedScreen from './screens/ListLikedScreen';
import PostScreen from './screens/PostScreen';
import ChatScreen from './components/chat/Chat';
import ChatListScreen from './components/chat/List';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = async () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          setSignedIn(false);
        } else {
          setSignedIn(true);
        }
      });
    }
    unsubscribe();
  }, []);

  return (
    <>
      {
        signedIn ?
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Main"
                screenOptions={screenOptions}
              >
                <Stack.Screen
                  name="Main"
                  component={MainScreen} />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen} />
                <Stack.Screen
                  name="Add"
                  component={AddScreen} />
                <Stack.Screen
                  name="Save"
                  component={SaveScreen} />
                <Stack.Screen
                  name="Comments"
                  component={CommentsScreen} />
                <Stack.Screen
                  name="ListLiked"
                  component={ListLikedScreen} />
                <Stack.Screen
                  name="Post"
                  component={PostScreen} />
                <Stack.Screen name="ChatList" component={ChatListScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
          :
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={screenOptions}
            >
              <Stack.Screen
                name="Register"
                component={RegisterScreen} />
              <Stack.Screen
                name="Login"
                component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      }
    </>
  );
};

export default App;