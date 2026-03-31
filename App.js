import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox, Input } from '@rneui/themed';

const initialTasks = [
  {
    key: '1',
    description: 'Finish the React Native todo assignment',
    completed: false,
  },
  {
    key: '2',
    description: 'Review FlatList rendering',
    completed: true,
  },
  {
    key: '3',
    description: 'Record the web demo video',
    completed: false,
  },
  {
    key: '4',
    description: 'Submit repository and GitHub Pages links',
    completed: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (taskKey) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.key === taskKey
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addTask = () => {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((currentTasks) => [
      {
        key: Date.now().toString(),
        description: trimmedTask,
        completed: false,
      },
      ...currentTasks,
    ]);
    setNewTask('');
    Keyboard.dismiss();
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        checkedColor="#0f766e"
        uncheckedColor="#94a3b8"
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>React Native + Expo</Text>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.subtitle}>
          Add tasks, mark them complete, and keep everything organized in one
          place.
        </Text>

        <View style={styles.addTaskRow}>
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.inputWrapper}
            inputStyle={styles.input}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks yet. Add one above.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  eyebrow: {
    color: '#0f766e',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  addTaskRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    minHeight: 56,
    paddingHorizontal: 16,
  },
  input: {
    color: '#0f172a',
    fontSize: 16,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#0f766e',
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 22,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 18,
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    margin: 0,
    marginRight: 0,
    padding: 0,
  },
  taskText: {
    color: '#0f172a',
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 18,
  },
  completedTaskText: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
    paddingTop: 24,
    textAlign: 'center',
  },
});
