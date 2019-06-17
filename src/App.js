import React from "react";
import {
  AuthScreen,
  LoadingScreen,
  ShotsScreen,
  CreateShotScreen,
  LoginScreen
} from "./screens";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import NavigationService from "./utils/navigationService";

const defaultNavigationOptions = {
  headerTransparent: true
};

const AppStack = createStackNavigator(
  {
    Shots: ShotsScreen,
    CreateShot: CreateShotScreen
  },
  {
    defaultNavigationOptions
  }
);

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Login: LoginScreen
  },
  { headerMode: "none" }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "LoadingScreen"
    }
  )
);

const App = () => (
  <AppContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);

export default App;
