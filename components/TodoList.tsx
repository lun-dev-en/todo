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
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => onToggle(item.id)}>
            <Text style={[styles.text, item.done && styles.done]}>{item.text}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={styles.delete}>削除</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "gray" },
  delete: { color: "red" },
});
