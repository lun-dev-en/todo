import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  // 日付ごとにグループ化
  const grouped = todos.reduce((acc: Record<string, Todo[]>, todo) => {
    if (!acc[todo.date]) acc[todo.date] = [];
    acc[todo.date].push(todo);
    return acc;
  }, {});

  const sections = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1)); // 新しい日付を上に

  return (
    <FlatList
      data={sections}
      keyExtractor={(date) => date}
      renderItem={({ item: date }) => (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{date}</Text>
          {grouped[date].map((todo) => (
            <View key={todo.id} style={styles.item}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => onToggle(todo.id)}
              >
                <Text style={{ fontSize: 18, color: todo.done ? "#1E90FF" : "#ccc" }}>
                  {todo.done ? "✔" : "○"}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.text, todo.done && styles.done]}>
                {todo.text}
              </Text>
              <TouchableOpacity onPress={() => onDelete(todo.id)}>
                <Text style={styles.delete}>削除</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 20, paddingHorizontal: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1E90FF",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  checkbox: { marginRight: 10 },
  text: { flex: 1, fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "gray" },
  delete: { color: "red", marginLeft: 10 },
});
