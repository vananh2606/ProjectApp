import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommuntiyIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from './redux/actions/index';

import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
};

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        return (
            <Tab.Navigator
                initialRouteName='Feed'
                labeled={false}
                activeColor="#000000"
                inactiveColor="#808080"
                barStyle={{ backgroundColor: '#ffffff' }}
            >
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="home" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Search" component={SearchScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Search", { uid: firebase.auth().currentUser.uid })
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="magnify" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommuntiyIcons name="plus-box" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
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