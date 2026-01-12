# Quick Start Guide for Expo Snack

## How to run on your phone

1. **Install Expo Go** from your app store.

2. In your mobile browser, open **https://snack.expo.dev** and tap "New Snack".

3. Replace the default code with the **App.js** from this repository.

4. Add dependencies in the Snack sidebar:
   - `@react-native-async-storage/async-storage`
   - `expo-notifications`
   - `dayjs`
   - `uuid`

5. Save, then scan the QR code with Expo Go. It will hot-reload on your phone.

## What This App Does

This is a **Task Manager** application with the following features:

- ✅ Create and manage tasks
- 🔔 Set notification reminders
- ✓ Mark tasks as completed
- 🗑️ Delete tasks
- 💾 Persistent storage with AsyncStorage
- 📱 Clean, intuitive UI

## App.js Code

The complete App.js code is available in this repository. It includes:

- All React Native components (SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Switch)
- AsyncStorage for data persistence
- Expo Notifications for reminders
- dayjs for date/time formatting
- uuid for unique task IDs
- Complete styling with StyleSheet

Simply copy the entire contents of `App.js` from this repository into your Expo Snack!

---

For detailed instructions, see [EXPO_SNACK_README.md](./EXPO_SNACK_README.md)
