import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Logo from '../assets/images/Logo.png';
import Plus from '../assets/images/plus.png';
import Clipboard from '../assets/images/Clipboard.png';
import TaskComponent, { type Task } from '@/components/TaskComponent';
import { useState } from 'react';
import CustomTextInput from '@/components/CustomTextInput';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');

  const handleTaskAdd = (taskName: string) => {
    const newTask: Task = {
      taskName,
      taskId: (tasks.at(-1)?.taskId ?? 0) + 1,
      isDone: false,
    }

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleTaskDelete = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter((task) => task.taskId !== taskId));
  };

  const handleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks => prevTasks.map((task) => {
      if (task.taskId === taskId) {
        const newTask: Task = {
          isDone: !task.isDone,
          taskId,
          taskName
        };

        return newTask;
      }

      return task;
    }))
  };

  const getTasksCount = () => {
    return tasks.length;
  };

  const getCompletedTasksCount = () => {
    return tasks.filter((task) => task.isDone).length;
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoBG}>
          <Image
            source={Logo}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.inputsContainer}>
            <CustomTextInput
              onChange={setTaskName}
              value={taskName}
            />
            <TouchableOpacity
              style={styles.addTaskBtn}
              onPress={() => handleTaskAdd(taskName)}
            >
              <Image
                source={Plus}
                style={styles.addTaskBtnIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentMainView}>
            <View style={styles.headerView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#4EA8DE', marginRight: 8}}>Criadas</Text>
                <Text style={styles.tasksCountNumber}>{getTasksCount()}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#8284FA', marginRight: 8}}>Concluídas</Text>
                <Text style={styles.tasksCountNumber}>{getCompletedTasksCount()}</Text>
              </View>
            </View>

            <FlatList
              data={tasks}
              keyExtractor={(item) => String(item.taskId)}
              renderItem={({item}) => (
                <TaskComponent
                  task={item}
                  onComplete={handleTaskCompletion}
                  onDelete={handleTaskDelete}
                />
              )}
              ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                  <Image
                    source={Clipboard}
                    style={styles.emptyListIcon}
                  />
                  <Text style={{fontWeight: 'bold', color: '#808080'}}>Você ainda não tem tarefas cadastradas</Text>
                  <Text style={{color: '#808080'}}>Crie tarefas e organize seus itens a fazer</Text>
                </View>
              )}
            />
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    flex: 1
  },
  logoBG: {
    backgroundColor: '#0D0D0D',
    height: 173,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    position: 'absolute'
  },
  mainContainer: {
    flex: 1,
    marginTop: 142,
    paddingHorizontal: 24
  },
  addTaskBtn: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#1E6F9F'
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  addTaskBtnIcon: {
    height: 16,
    width: 16
  },
  contentMainView: {
    marginTop: 32
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tasksCountNumber: {
    paddingHorizontal: 8,
    backgroundColor: '#333333',
    borderRadius: 100,
    color: '#D9D9D9',
    fontWeight: 'bold'
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  emptyListIcon: {
    width: 56,
    height: 56,
    marginBottom: 16
  },
})