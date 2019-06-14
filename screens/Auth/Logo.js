import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

const logo = require("../images/logo.png");

export default () => {
  const [lift] = useState(new Animated.Value(-20));

  useEffect(() => {
    Animated.timing(lift, {
      toValue: -100,
      duration: 1000
    }).start();
  });

  return (
    <Animated.Image
      source={logo}
      style={{
        top: lift
      }}
    />
  );
};
