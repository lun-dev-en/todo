import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  // ログイン状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
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
