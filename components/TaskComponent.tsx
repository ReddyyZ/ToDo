import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Trash from '../assets/images/trash.png';
import Done from '../assets/images/done.png';
import NotDone from '../assets/images/notdone.png';

export type Task = {
  taskId: number;
  isDone: boolean;
  taskName: string;
};

type TaskComponentProps = {
  onComplete: (taskId: number) => void,
  onDelete: (taskId: number) => void,
  task: Task
};

export default function TaskComponent({ task, onComplete, onDelete }: TaskComponentProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.doneBtn}  onPress={() => onComplete(task.taskId)}>
        <Image
          source={task.isDone ? Done : NotDone}
          style={{
            width: 18,
            height: 18
          }}
        />
      </TouchableOpacity>
      <Text style={task.isDone ? styles.taskTextDone : styles.taskText}>
        {task.taskName}
      </Text>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(task.taskId)}
      >
        <Image 
          source={Trash}
          style={{
            width: 14,
            height: 16
          }}
        />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: 64,
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#333333',
    flex: 1,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  taskText: {
    color: '#F2F2F2',
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8
  },
  doneBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskTextDone: {
    color: '#808080',
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8,
    textDecorationLine: 'line-through'
  }
});