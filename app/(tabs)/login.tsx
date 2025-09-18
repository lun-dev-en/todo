import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { supabase } from "../../supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.loggedIn}>ログイン中: {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>ログアウト</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="メールアドレス"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="パスワード"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={signup}>
            <Text style={styles.buttonText}>新規登録</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>ログイン</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  loggedIn: { fontSize: 18, fontWeight: "bold", color: "#1E90FF", marginBottom: 20 },
});
