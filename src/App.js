import React from "react";
import { LoadingScreen } from "./screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import NavigationService from "./utils/navigationService";
import { authStack, appStack } from "./routes";

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      app: appStack,
      auth: authStack
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
