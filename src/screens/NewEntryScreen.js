import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { saveCapsule, hasTodayCapsule } from "../../storage/capsules";

const MOODS = [
  { label: "😊", value: "happy" },
  { label: "😐", value: "neutral" },
  { label: "😞", value: "bad" },
];

export default function NewEntryScreen({ navigation }) {
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSave = async () => {
    if (!text || !selectedMood) return;

    const alreadySaved = await hasTodayCapsule();
    if (alreadySaved) {
      alert("You already logged your mood today.");
      return;
    }

    const newCapsule = {
      id: Date.now(),
      text,
      mood: selectedMood,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    await saveCapsule(newCapsule);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How was your day?</Text>
      <TextInput
        style={styles.input}
        placeholder="Write something..."
        placeholderTextColor="#888"
        multiline
        value={text}
        onChangeText={setText}
      />

      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodContainer}>
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              selectedMood === mood.value && styles.moodSelected,
            ]}
            onPress={() => setSelectedMood(mood.value)}>
            <Text style={styles.moodEmoji}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!text || !selectedMood) && styles.buttonDisabled,
        ]}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Save capsule</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: "top",
  },
  moodContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  moodButton: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  moodSelected: {
    borderColor: "#e94560",
  },
  moodEmoji: {
    fontSize: 32,
  },
  button: {
    backgroundColor: "#e94560",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
