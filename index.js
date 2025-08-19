#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs";
import path from "path";

async function run() {
  console.log(chalk.green("🚀 Welcome to Quickstart React Native ⚛️"));

  // Step 1: Ask project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      default: "MyApp",
    },
  ]);

  // Step 2: Initialize RN app
  console.log(chalk.blue("📦 Creating React Native project..."));

  await execa(
    "npx",
    ["@react-native-community/cli@latest", "init", projectName],
    {
      stdio: "inherit",
    }
  );

  // Move into project
  process.chdir(projectName);

  // Step 3: Install essential packages
  console.log(chalk.blue("🔗 Installing essential packages..."));

  await execa(
    "npm",
    [
      "install",
      "axios",
      "@react-navigation/native",
      "@react-navigation/native-stack",
      "@react-navigation/bottom-tabs",
      "react-native-screens",
      "react-native-safe-area-context",
    ],
    { stdio: "inherit" }
  );

  // Step 4: Ask for optional Paper
  const { withPaper } = await inquirer.prompt([
    {
      type: "confirm",
      name: "withPaper",
      message: "Do you want to install react-native-paper?",
      default: false,
    },
  ]);

  if (withPaper) {
    console.log(chalk.blue("🎨 Installing react-native-paper..."));
    await execa(
      "npm",
      [
        "install",
        "react-native-paper",
        "@react-native-vector-icons/material-design-icons",
      ],
      { stdio: "inherit" }
    );
  }

  // Step 5: Create folder structure
  console.log(chalk.blue("📂 Setting up folder structure..."));

  const folders = [
    "src/api",
    "src/assets",
    "src/navigation",
    "src/screens",
    "src/components",
    "src/theme",
    "src/utils",
  ];
  folders.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

  // Utility to write files
  const writeFile = (filePath, content) => {
    fs.writeFileSync(path.join(process.cwd(), filePath), content, "utf8");
  };

  // Write boilerplate files
  writeFile(
    "src/api/axiosConfig.js",
    `
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // change later
  timeout: 5000,
});

export default axiosInstance;
`
  );

  writeFile(
    "src/navigation/RootNavigator.js",
    `
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
`
  );

  writeFile(
    "src/navigation/AppNavigator.js",
    `

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: "Home" }} />
    </Tab.Navigator>
  );
}
`
  );

  writeFile(
    "src/screens/HomeScreen.js",
    `
import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🏠 Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
}
`
  );

  writeFile(
    "src/screens/DetailsScreen.js",
    `
import React from "react";
import { View, Text } from "react-native";

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>📄 Details Screen</Text>
    </View>
  );
}
`
  );

  if (withPaper) {
    writeFile(
      "src/theme/theme.js",
      `
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    secondary: "#03dac6",
  },
};

export default theme;
`
    );

    writeFile(
      "babel.config.js",
      `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
`
    );
  }

  writeFile(
    "App.js",
    `
import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
${
  withPaper
    ? `import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/theme/theme";`
    : ""
}
let AppWrapper = ({ children }) => children;

${
  withPaper
    ? `AppWrapper = ({ children }) => <PaperProvider theme={theme}>{children}</PaperProvider>;`
    : ""
}

export default function App() {
  return (
    <AppWrapper>
      <RootNavigator />
    </AppWrapper>
  );
}
`
  );

  // Step 6: Patch MainActivity.kt
  patchMainActivity(projectName);

  console.log(
    chalk.green(
      `✅ Setup complete! Run:\n\ncd ${projectName}\nnpm run android\n`
    )
  );
}

// --- PATCH MAINACTIVITY.KT ---
function patchMainActivity(appName = "") {

  const mainActivityPath = path.join(
    process.cwd(),
    "android/app/src/main/java/com/",
    appName.toLowerCase(),
    "MainActivity.kt"
  );

  if (!fs.existsSync(mainActivityPath)) {
    console.log("⚠️ MainActivity.kt not found, skipping patch.");
    return;
  }

  let finalContent = `
package com.${appName.toLowerCase()}

import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "${appName}"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
`;

  fs.writeFileSync(mainActivityPath, finalContent, "utf8");
  console.log("✅ Patched MainActivity.kt successfully!");
}

run();
