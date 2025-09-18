import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="タスクを入力"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 10, paddingHorizontal: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#1E90FF",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
