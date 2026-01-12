import React, { useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const STORAGE_KEY = "@tasks_storage";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [enableNotifications, setEnableNotifications] = useState(false);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    loadTasks();
    requestNotificationPermissions();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable notifications to receive reminders."
      );
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
      Alert.alert("Error", "Failed to load tasks from storage.");
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  };

  const addTask = async () => {
    if (!taskText.trim()) {
      Alert.alert("Error", "Please enter a task.");
      return;
    }

    const newTask = {
      id: uuidv4(),
      text: taskText.trim(),
      completed: false,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      notificationId: null,
    };

    // Schedule notification if enabled and time is set
    if (enableNotifications && notificationTime) {
      try {
        const scheduledTime = dayjs(notificationTime, "HH:mm");
        if (scheduledTime.isValid()) {
          const now = dayjs();
          let triggerTime = scheduledTime;
          
          // If time is in the past today, schedule for tomorrow
          if (triggerTime.isBefore(now)) {
            triggerTime = triggerTime.add(1, "day");
          }

          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Task Reminder",
              body: taskText.trim(),
              sound: true,
            },
            trigger: {
              date: triggerTime.toDate(),
              repeats: false,
            },
          });

          newTask.notificationId = notificationId;
        }
      } catch (error) {
        console.error("Failed to schedule notification:", error);
      }
    }

    setTasks([...tasks, newTask]);
    setTaskText("");
    setNotificationTime("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    
    // Cancel notification if it exists
    if (task?.notificationId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(task.notificationId);
      } catch (error) {
        console.error("Failed to cancel notification:", error);
      }
    }

    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
      },
    ]);
  };

  const clearAllTasks = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            // Cancel all scheduled notifications
            for (const task of tasks) {
              if (task.notificationId) {
                try {
                  await Notifications.cancelScheduledNotificationAsync(
                    task.notificationId
                  );
                } catch (error) {
                  console.error("Failed to cancel notification:", error);
                }
              }
            }
            setTasks([]);
          },
        },
      ]
    );
  };

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.taskTextContainer}>
          <Text
            style={[
              styles.taskText,
              item.completed && styles.taskTextCompleted,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.taskDate}>
            {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
        <Text style={styles.headerSubtitle}>
          {completedCount} of {tasks.length} completed
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          placeholderTextColor="#999"
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
        />
        
        <View style={styles.notificationContainer}>
          <View style={styles.notificationRow}>
            <Text style={styles.notificationLabel}>Enable Reminder</Text>
            <Switch
              value={enableNotifications}
              onValueChange={setEnableNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={enableNotifications ? "#007AFF" : "#f4f3f4"}
            />
          </View>
          
          {enableNotifications && (
            <TextInput
              style={styles.timeInput}
              placeholder="Time (HH:mm, e.g., 14:30)"
              placeholderTextColor="#999"
              value={notificationTime}
              onChangeText={setNotificationTime}
            />
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubtext}>Add your first task above</Text>
          </View>
        }
      />

      {tasks.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
          <Text style={styles.clearButtonText}>Clear All Tasks</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  notificationContainer: {
    marginBottom: 10,
  },
  notificationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationLabel: {
    fontSize: 16,
    color: "#333",
  },
  timeInput: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    padding: 15,
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDate: {
    fontSize: 12,
    color: "#999",
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: "#999",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
  },
  clearButton: {
    backgroundColor: "#ff3b30",
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
