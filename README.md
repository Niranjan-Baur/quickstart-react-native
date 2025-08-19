# 📱 quickstart-react-native
🚀 quickstart-react-native is an open-source CLI tool that lets you instantly create a React Native app with `axios`, `react-navigation`, `react-native-paper` (optional) package, and pre-configured project structure — all in one command.

## Features
- Interactive Setup — Ask you for your project name, optional packages
- Default Package Support — `axios`, `react-navigation`
- Optional Packages — `react-native-paper`
- Automatic Folder Structure — creates api, components, navigation, screens, theme, utils folders
- Boilerplate Ready — replaces default React Native boilerplate with a clean welcome page
- Axios Setup — pre-configured Axios instance.

## 📦 Installation
You don’t need to install it globally — run it instantly with `npx`:

```
 npx quickstart-react-native
```

## 🛠 Usage
When you run `npx quickstart-react-native`, you will be prompted to:


> ? Enter project name: MyApp

This will 
- create a new React Native project called `/MyApp`.
- Install `axios`
- Install `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- Install `react-native-screens`, `react-native-safe-area-context`,
- Create standard project folders
- Add a clean welcome screen
- Set up an Axios instance at `src/api/axiosConfig.js`
- Set up React Navigation
  
then this will ask:
> ? Do you want to install react-native-paper?

This will
- Install `react-native-paper` and `@react-native-vector-icons/material-design-icons`
- Modifly `babel.config.js` if yes,
- Create theme.js file at `src/theme/theme.js` if yes

## 📂 Folder Structure
After running, your project will look like this:

```
MyApp/
 ├── android/
 ├── ios/
 ├── src/
 │    ├── api/         # Axios API calls
 │    ├── components/  # Reusable components
 │    ├── navigation/  # React Navigation setup
 │    ├── screens/     # Screen files
 │    ├── utils/       # Helpers
 ├── App.js            # Entry point
 ├── package.json

```

## 👐 Contributing
We welcome contributions! Follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added new feature`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request

Before submitting, please ensure:

- Your code follows project style guidelines
- You have tested your changes locally






