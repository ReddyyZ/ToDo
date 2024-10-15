import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

type CustomTextInputProps = {
  onChange: (taskName: string) => void;
  value: string;
}

export default function CustomTextInput({ value, onChange }: CustomTextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={'#808080'}
      placeholder='Adicione uma nova tarefa'
      onChangeText={onChange}
      value={value}
    />
  )
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#262626',
    color: '#808080',
    height: 54,
    padding: 16,
    fontSize: 16,
    flex: 1,
    marginRight: 4,
    borderRadius: 6
  }
});