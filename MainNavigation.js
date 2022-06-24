import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommuntiyIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase';
// import * as Notifications from 'expo-notifications';
import { reload } from './redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import OtherProfileScreen from './screens/OtherProfileScreen';
import NotifiScreen from './screens/NotifiScreen';
import ChatListScreen from './screens/ListChatsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const screenOptions = {
    headerShown: false,
};

const EmptyScreen = () => {
    return (null)
};

const FeedStack = () => (
    <Stack.Navigator
        initialRouteName='Feed'
        screenOptions={screenOptions}
    >
        <Stack.Screen
            name='Feed'
            component={FeedScreen}
        />
        <Stack.Screen
            name='OtherProfile'
            component={OtherProfileScreen}
        />
    </Stack.Navigator>
);

const SearchStack = (props) => (
    <Stack.Navigator
        initialRouteName='Search'
        screenOptions={screenOptions}
    >
        <Stack.Screen
            name='Search'
            component={SearchScreen}
        />
        <Stack.Screen
            name='OtherProfile'
            component={OtherProfileScreen}
        />
    </Stack.Navigator>
);

const Main = (props) => {
    const [unreadChats, setUnreadChats] = useState(false);

    useEffect(() => {
        props.reload();
        // Notifications.addNotificationResponseReceivedListener((notification) => {
        //     switch (notification.notification.request.content.data.type) {
        //         case "post":
        //             props.navigation.navigate("Post", { item: notification.notification.request.content.data.postId, user: notification.notification.request.content.data.user, notification: true })
        //             break;
        //         case "chat":
        //             props.navigation.navigate("Chat", { user: notification.notification.request.content.data.user, notification: true })
        //             break;
        //         case "profile":
        //             props.navigation.navigate("ProfileOther", { uid: notification.notification.request.content.data.user, username: undefined, notification: true })
        //             break;
        //     }
        // });
    }, []);

    useEffect(() => {
        // if (props.currentUser != null) {
        //     if (props.currentUser.banned) {
        //         props.navigation.navigate("Blocked")
        //     }
        // }
        setUnreadChats(false);
        for (let i = 0; i < props.chats.length; i++) {
            if (!props.chats[i][firebase.auth().currentUser.uid]) {
                setUnreadChats(true);
            }
        }
    }, [props.currentUser, props.chats]);

    if (props.currentUser == null) {
        return (<View></View>)
    };

    return (
        <Tab.Navigator
            initialRouteName='FeedStack'
            labeled={false}
            activeColor="#000000"
            inactiveColor="#808080"
            barStyle={{ backgroundColor: '#ffffff' }}
        >
            <Tab.Screen name='FeedStack' component={FeedStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommuntiyIcons name="home" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Notifi" component={NotifiScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommuntiyIcons name="heart" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="SearchStack" component={SearchStack}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("SearchStack", {screen: 'Search', params: { selected: 0 }});
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommuntiyIcons name="magnify" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen key={Date.now()} name="chat" component={ChatListScreen} navigation={props.navigation} share={false}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <MaterialCommuntiyIcons name="chat" color={color} size={26} />
                            {unreadChats ?
                                <View style={{ backgroundColor: 'red', width: 10, height: 10, position: 'absolute', right: 0, borderRadius: 50 }} />
                                :
                                null
                            }
                        </View>
                    ),
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid });
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommuntiyIcons name="account-circle" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    chats: store.userState.chats,
    friendsRequestsReceived: store.userState.friendsRequestsReceived,
});

const mapDispatchProps = (dispatch) => bindActionCreators({ reload }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);