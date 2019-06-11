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

const AppStack = createStackNavigator({
  //Home: HomeScreen,
  //Profile: ProfileScreen,
  //Shots: ShotsScreen,
  CreateShot: CreateShotScreen
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
      initialRouteName: "App"
    }
  )
);

const App = () => {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default App;
