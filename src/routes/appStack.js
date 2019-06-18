import { ShotsScreen, CreateShotScreen } from "../screens";
import { createStackNavigator } from "react-navigation";

const defaultNavigationOptions = {
  headerTransparent: true
};

const appStack = createStackNavigator(
  {
    shots: ShotsScreen,
    createShot: CreateShotScreen
  },
  {
    defaultNavigationOptions
  }
);

export default appStack;
