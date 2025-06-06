// app.config.js
module.exports = () => ({
    expo: {
        name: "Pomodoro",
        slug: "Pomodoro",
        scheme: "Pomodoro",
        version: "0.0.1",
        orientation: "portrait",
        icon: "./assets/pomo.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/pomo.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            bundleIdentifier: "com.theosourisseau.pomodoro",
            supportsTablet: true,
        },
        android: {
            package: "com.theosourisseau.pomodoro",
            adaptiveIcon: {
                foregroundImage: "./assets/pomo.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true
        },
        web: {
            favicon: "./assets/pomofavicond.png"
        },
        extra: {
            apiUrl: process.env.EXPO_PUBLIC_URI_API,
            googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        },
        plugins: ["expo-router", "expo-font", "expo-web-browser"],
    }
});
