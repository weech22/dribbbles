import React from "react";
import {
  AuthScreen,
  HomeScreen,
  ProfileScreen,
  LoadingScreen,
  ShotsScreen,
  CreateShotScreen,
  LogoutScreen,
  LoginScreen
} from "./screens";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import NavigationService from "./utils/navigationService";

const navigationOptions = {
  headerStyle: {
    backgroundColor: "#212121"
  },
  headerTitleStyle: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    flex: 1
  }
};

const AppStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions },
  Profile: { screen: ProfileScreen, navigationOptions },
  Shots: { screen: ShotsScreen, navigationOptions },
  CreateShot: { screen: CreateShotScreen, navigationOptions }
});

const AuthStack = createStackNavigator({
  Auth: AuthScreen,
  Login: LoginScreen
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      Logout: LogoutScreen
    },
    {
      initialRouteName: "LoadingScreen"
    }
  )
);

export default () => (
  <AppContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);
