import { SectionList, Text, View, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  // 今日と昨日の日付を計算
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // グループ化
  const todayTodos = todos.filter((t) => t.date === today);
  const yesterdayTodos = todos.filter((t) => t.date === yesterday);
  const pastTodos = todos.filter((t) => t.date !== today && t.date !== yesterday);

  const sections = [
    { title: "今日", data: todayTodos },
    { title: "昨日", data: yesterdayTodos },
    { title: "過去のタスク", data: pastTodos },
  ].filter((section) => section.data.length > 0); // 空は非表示

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          id={item.id}
          text={item.text}
          done={item.done}
          date={item.date}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>📅 {title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E6F0FA",
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
  },
});

