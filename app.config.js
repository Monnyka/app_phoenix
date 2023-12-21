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
//       "package": "com.nyka.Phoenix"
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

const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Phoenix (Dev)" : "Phoenix",
  slug: "Phoenix",
  scheme: "phoenix",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/ic_app_phoenix.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? "com.Phoenix.dev" : "com.Phoenix",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: IS_DEV ? "com.Phoenix.dev" : "com.Phoenix",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "e8147d1e-d410-42ea-99f4-36cda15884df",
    },
  },
  plugins: ["expo-router"],
};
