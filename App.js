import React from "react";
import {
  AuthScreen,
  HomeScreen,
  ProfileScreen,
  LoadingScreen,
  ShotsScreen
} from "./screens";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import NavigationService from "./utils/navigationService";

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Shots: ShotsScreen
});

const AuthStack = createStackNavigator({ Auth: AuthScreen });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      //LoadingScreen,
      App: AppStack
      //Auth: AuthStack
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
