import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do homework', completed: false },
    { key: '2', description: 'Study React Native', completed: true },
    { key: '3', description: 'Submit assignment', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  function addTask() {
    if (newTask.trim() === '') {
      return;
    }

    const task = {
      key: Date.now().toString(),
      description: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  }

  function toggleTask(key) {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function renderTask({ item }) {
    return (
      <View style={styles.taskBox}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
          title={item.description}
          containerStyle={styles.checkBox}
          textStyle={[styles.taskText, item.completed && styles.completedTask]}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Todo List</Text>

      <Input
        placeholder="Add a task"
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={addTask}
        autoCorrect={false}
      />

      <Button title="Add" onPress={addTask} containerStyle={styles.button} />

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={<Text>No tasks yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginBottom: 20,
  },
  taskBox: {
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
});
