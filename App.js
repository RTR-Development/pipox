// Main Supporting technologies:
// Redux for temp on-device storage
// Redux-thunk for cloud message storage
// React Navigation V5 for screen navigation (stack + tab)

import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";
import messagesReducer from "./store/reducers/messages";
import COLORS from "./constants/colors";

// Return default font-family
const fetchFonts = async () => {
  return Font.loadAsync({
    "segoe-ui-regular": require("./assets/fonts/Segoe_UI_Regular.ttf"),
    "segoe-ui-bold": require("./assets/fonts/Segoe_UI_Bold.ttf"),
    "segoe-ui-italic": require("./assets/fonts/Segoe_UI_Italic.ttf"),
  });
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.Foreground} />
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
