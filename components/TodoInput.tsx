import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim().length > 0) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="新しいタスクを入力"
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#1E90FF", // ブルー
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
