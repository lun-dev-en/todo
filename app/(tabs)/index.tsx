import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import { supabase } from "../../supabase";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
  user_id: string;
};

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<any>(null);

  // 認証状態を監視
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Todo を読み込み
  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (!error && data) setTodos(data as Todo[]);
    };
    fetchTodos();
  }, [user]);

  // Todo 追加
  const addTodo = async (text: string) => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("todos")
      .insert([{ text, done: false, date: today, user_id: user.id }])
      .select();
    if (!error && data) setTodos([...todos, data[0] as Todo]);
  };

  // 完了切替
  const toggleTodo = async (id: string, done: boolean) => {
    await supabase.from("todos").update({ done: !done }).eq("id", id);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // 削除
  const deleteTodo = async (id: string) => {
    await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <TodoInput onAdd={addTodo} />
          <TodoList
            todos={todos}
            onToggle={(id) => {
              const todo = todos.find((t) => t.id === id);
              if (todo) toggleTodo(todo.id, todo.done);
            }}
            onDelete={deleteTodo}
          />
        </>
      ) : (
        <Text style={styles.message}>ログインしてください</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  message: { fontSize: 18, textAlign: "center", marginTop: 50 },
});
