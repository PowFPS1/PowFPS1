# Task Manager - Expo Snack Application

A simple and elegant task manager application built with React Native and Expo. This app allows you to create tasks, set reminders with notifications, and manage your to-do list efficiently.

## Features

- ✅ Create and manage tasks
- 🔔 Set notification reminders for tasks
- ✓ Mark tasks as completed
- 🗑️ Delete individual tasks or clear all
- 💾 Persistent storage using AsyncStorage
- 📱 Clean and intuitive UI
- 🕐 Display creation time for each task

## How to Run on Your Phone with Expo Snack

### Step 1: Install Expo Go
Download and install **Expo Go** from your device's app store:
- [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
- [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Open Expo Snack
1. Open your mobile browser
2. Navigate to [https://snack.expo.dev](https://snack.expo.dev)
3. Tap "New Snack" to create a new project

### Step 3: Add the Code
1. Replace the default code in `App.js` with the code from this repository's `App.js` file
2. You can copy the entire file content from: [App.js](./App.js)

### Step 4: Add Dependencies
In the Expo Snack sidebar, add the following dependencies:
- `@react-native-async-storage/async-storage` (version 1.23.1)
- `expo-notifications` (version ~0.28.0)
- `dayjs` (version ^1.11.10)
- `uuid` (version ^9.0.1)

Click the "+" button next to "Dependencies" and search for each package, then click "Add package".

### Step 5: Save and Run
1. Save your Snack (you may need to create an Expo account)
2. Scan the QR code displayed on the screen using Expo Go
3. The app will build and load on your phone
4. Any changes you make will hot-reload automatically!

## Alternative: Run Locally

If you prefer to run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or run on specific platform
npm run android
npm run ios
npm run web
```

## Using the App

1. **Add a Task**: 
   - Enter your task in the text input
   - Optionally enable reminders and set a time (24-hour format, e.g., 14:30)
   - Tap "Add Task"

2. **Complete a Task**: 
   - Tap on any task to mark it as completed
   - Tap again to mark as incomplete

3. **Delete a Task**: 
   - Tap the trash icon (🗑️) next to a task
   - Confirm deletion in the alert dialog

4. **Clear All Tasks**: 
   - Tap "Clear All Tasks" button at the bottom
   - Confirm to delete all tasks

## Permissions

The app requires notification permissions to send task reminders. You'll be prompted to grant this permission when you first open the app.

## Technologies Used

- **React Native**: Cross-platform mobile app framework
- **Expo**: Development platform for React Native
- **AsyncStorage**: Local data persistence
- **Expo Notifications**: Local notification scheduling
- **dayjs**: Date and time formatting
- **uuid**: Unique ID generation for tasks

## Project Structure

```
.
├── App.js              # Main application component
├── package.json        # Project dependencies and scripts
├── app.json           # Expo configuration
└── README.md          # This file
```

## License

This project is open source and available for educational purposes.

## Author

Created by [PowFPS1](https://github.com/PowFPS1)

## Support

For issues or questions, please open an issue on GitHub.
