import { AuthScreen, LoginScreen } from "../screens";
import { createStackNavigator } from "react-navigation";

const authStack = createStackNavigator(
  {
    auth: AuthScreen,
    login: LoginScreen
  },
  { headerMode: "none" }
);

export default authStack;
