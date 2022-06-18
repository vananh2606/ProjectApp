import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommuntiyIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from './redux/actions/index';

import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import OtherProfileScreen from './screens/OtherProfileScreen';
import NotifiScreen from './screens/NotifiScreen';

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


class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    };

    componentWillUnmount() {
        this.props.clearData();
    };

    render() {
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

                <Tab.Screen name="SearchStack" component={SearchStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="magnify" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add");
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="plus-box" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Notifi" component={NotifiScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="heart-outline" color={color} size={26} />
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
        )
    }
};

const mapStateToProps = (store) => {
    return {
        currentUser: store.userState.currentUser,
    };
};

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);