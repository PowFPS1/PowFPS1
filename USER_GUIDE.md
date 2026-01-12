# Task Manager App - User Guide

## Overview

This is a full-featured Task Manager application designed to run on Expo Snack. It demonstrates best practices for React Native development including state management, persistent storage, and local notifications.

## Key Features Implemented

### 1. Task Management
- **Add Tasks**: Simple text input for creating new tasks
- **Complete Tasks**: Tap any task to toggle completion status
- **Delete Tasks**: Individual delete with confirmation
- **Clear All**: Bulk delete option with confirmation

### 2. Notifications
- **Optional Reminders**: Toggle switch to enable/disable notifications
- **Time Selection**: Set specific time for task reminders (24-hour format)
- **Automatic Scheduling**: Notifications scheduled automatically when task is created
- **Smart Scheduling**: If time is in the past, schedules for tomorrow

### 3. Data Persistence
- **AsyncStorage**: All tasks saved automatically
- **Auto-load**: Tasks loaded when app starts
- **Auto-save**: Tasks saved whenever changes are made

### 4. User Interface
- **Clean Design**: Modern, intuitive interface with iOS-style design
- **Progress Tracking**: Shows completed/total tasks count in header
- **Empty State**: Helpful message when no tasks exist
- **Responsive**: Adapts to different screen sizes

## Technical Implementation

### Components Used
- `SafeAreaView`: Safe area boundaries for different devices
- `View`: Container components
- `Text`: Text display
- `TextInput`: User input fields
- `TouchableOpacity`: Interactive buttons
- `FlatList`: Efficient scrollable task list
- `Alert`: System dialogs for confirmations
- `Switch`: Toggle for enabling notifications
- `StyleSheet`: Organized styling

### Libraries Used
- `@react-native-async-storage/async-storage`: Local data persistence
- `expo-notifications`: Local notification scheduling and permissions
- `dayjs`: Date/time parsing and formatting
- `uuid`: Unique identifier generation

### State Management
- `useState`: Component state for tasks, inputs, and settings
- `useEffect`: Side effects for loading/saving and permissions
- `useMemo`: Optimized calculation of completed tasks count

## Code Structure

### Main Functions

1. **loadTasks()**: Loads tasks from AsyncStorage on app start
2. **saveTasks()**: Saves tasks to AsyncStorage when they change
3. **requestNotificationPermissions()**: Requests notification permissions
4. **addTask()**: Creates new task and schedules notification if enabled
5. **toggleTask()**: Marks task as complete/incomplete
6. **deleteTask()**: Removes task and cancels its notification
7. **clearAllTasks()**: Removes all tasks and cancels all notifications

### Styling

The app uses a cohesive color scheme:
- Primary Color: `#007AFF` (iOS blue)
- Background: `#f5f5f5` (light gray)
- White cards with subtle shadows
- Destructive actions: `#ff3b30` (red)

## Usage Examples

### Adding a Simple Task
1. Type your task in the input field
2. Press "Add Task"
3. Task appears in the list below

### Adding a Task with Reminder
1. Type your task in the input field
2. Toggle "Enable Reminder" switch ON
3. Enter time in HH:mm format (e.g., "14:30" for 2:30 PM)
4. Press "Add Task"
5. You'll receive a notification at the specified time

### Managing Tasks
- **To mark as done**: Tap the task
- **To delete**: Tap the trash icon, then confirm
- **To clear all**: Tap "Clear All Tasks" at bottom, then confirm

## Running in Expo Snack

This app is specifically designed to run in Expo Snack:

1. Copy the entire `App.js` code
2. Paste into Expo Snack editor
3. Add the four dependencies
4. Save and scan QR code with Expo Go

The app will run immediately on your phone with full functionality including notifications!

## Error Handling

The app includes proper error handling:
- Validation for empty task input
- Try-catch blocks for AsyncStorage operations
- Graceful handling of notification permission denial
- Console logging for debugging

## Best Practices Demonstrated

✅ Functional components with hooks
✅ Proper cleanup of scheduled notifications
✅ User confirmations for destructive actions
✅ Optimized list rendering with FlatList
✅ Memoization for performance
✅ Clean separation of concerns
✅ Comprehensive error handling
✅ User-friendly empty states
✅ Consistent styling patterns

## Future Enhancement Ideas

- Edit existing tasks
- Task categories/tags
- Due dates
- Recurring notifications
- Dark mode support
- Search/filter functionality
- Task priority levels
- Statistics and charts

## License

Open source - free to use and modify for learning purposes.
