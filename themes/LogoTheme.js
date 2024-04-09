import React from "react";
import { Image } from "react-native";

function LogoTheme() {
  function LoginLogo({ imgStyle }) {
    return (
      <Image
        style={imgStyle}
        source={require("../assets/images/backgrounds/LogoWithTitle.png")}
        resizeMode="stretch"
      />
    );
  }

  function Logo({ imgStyle }) {
    return (
      <Image
        style={imgStyle}
        source={require("../assets/images/backgrounds/Logo.png")}
        resizeMode="stretch"
      />
    );
  }

  return {
    LoginLogo,
    Logo,
  };
}

export default LogoTheme;
