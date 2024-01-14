const IS_DEV = process.env.APP_VARIANT === "preview";

export default {
  name: IS_DEV ? "Phoenix (Dev)" : "Phoenix",
  scheme: "phoenix",
  slug: "phoenix",
  version: "1.0.0",
  orientation: "portrait",
  icon: IS_DEV
    ? "./assets/ic_app_phoenix_dev.png"
    : "./assets/ic_app_phoenix.png",
  userInterfaceStyle: "light",
  splash: {
    image: IS_DEV
      ? "./assets/ic_app_phoenix_dev.png"
      : "./assets/ic_app_phoenix.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? "com.nyka.Phoenix.dev" : "com.nyka.Phoenix",
  },
  android: {
    adaptiveIcon: {
      // foregroundImage: "./assets/adaptive-icon.png",
      foregroundImage: IS_DEV
        ? "./assets/ic_app_phoenix_dev.png"
        : "./assets/ic_app_phoenix.png",
      backgroundColor: "#ffffff",
    },
    package: IS_DEV ? "com.nyka.Phoenix.dev" : "com.nyka.Phoenix",
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: "7f9a0d03-ea5f-4929-8649-ba87eb030783",
    },
  },
  plugins: ["expo-router", "expo-localization"],
};

//old config
// {
//   "expo": {
//     "name": "Phoenix",
//     "slug": "Phoenix",
//     "scheme": "phoenix",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/ic_app_phoenix.png",
//     "userInterfaceStyle": "light",
//     "splash": {
//       "image": "./assets/splash.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "assetBundlePatterns": ["**/*"],
//     "ios": {
//       "supportsTablet": true,
//       "bundleIdentifier": "com.nyka.Phoenix"
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       },
//       "package": "com.nyka.Phoenix.uat"
//     },
//     "web": {
//       "favicon": "./assets/favicon.png"
//     },
//     "extra": {
//       "eas": {
//         "projectId": "e8147d1e-d410-42ea-99f4-36cda15884df"
//       }
//     },
//     "plugins": ["expo-router"]
//   }
// }
