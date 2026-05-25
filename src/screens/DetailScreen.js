import { View, Text, StyleSheet } from "react-native";

const MOOD_EMOJI = {
  happy: "😊",
  neutral: "😐",
  bad: "😞",
};

export default function DetailScreen({ route }) {
  const { capsule } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{MOOD_EMOJI[capsule.mood]}</Text>
      <Text style={styles.mood}>{capsule.mood}</Text>
      <Text style={styles.date}>{capsule.date}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{capsule.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
    alignItems: "center",
  },
  emoji: {
    fontSize: 72,
    marginTop: 32,
    marginBottom: 12,
  },
  mood: {
    color: "#e94560",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  date: {
    color: "#888",
    fontSize: 14,
    marginBottom: 32,
  },
  textContainer: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 20,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
});
