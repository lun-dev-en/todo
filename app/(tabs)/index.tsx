import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Firestoreから読み込み
  useEffect(() => {
    const fetchTodos = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const list: Todo[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Todo, "id">),
      }));
      setTodos(list);
    };
    fetchTodos();
  }, []);

  // 追加
  const addTodo = async (text: string) => {
    const today = new Date().toISOString().split("T")[0];
    const docRef = await addDoc(collection(db, "todos"), {
      text,
      done: false,
      date: today,
      userId: auth.currentUser?.uid,
    });
    setTodos([...todos, { id: docRef.id, text, done: false, date: today }]);
  };

  // 完了切替
  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateDoc(doc(db, "todos", id), { done: !todo.done });
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // 削除
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
});
