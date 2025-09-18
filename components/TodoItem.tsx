import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  id: string;
  text: string;
  done: boolean;
  date: string;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ text, done, date, onToggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        <Text style={{ color: done ? "#1E90FF" : "#ccc", fontSize: 20 }}>
          {done ? "✔" : "○"}
        </Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, done && styles.done]}>{text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>削除</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  checkbox: { marginRight: 10 },
  textContainer: { flex: 1 },
  text: { fontSize: 18 },
  done: { textDecorationLine: "line-through", color: "#aaa" },
  date: { fontSize: 12, color: "#666" },
  delete: { color: "#1E90FF", fontWeight: "bold" },
});
