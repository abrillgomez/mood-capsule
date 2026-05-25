import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getCapsules } from "../../storage/capsules";

const MOOD_EMOJI = {
  happy: "😊",
  neutral: "😐",
  bad: "😞",
};

export default function HomeScreen({ navigation }) {
  const [capsules, setCapsules] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getCapsules();
        setCapsules(data);
      };
      load();
    }, []),
  );

  return (
    <View style={styles.container}>
      {capsules.length === 0 ? (
        <Text style={styles.empty}>No capsules yet 🫙</Text>
      ) : (
        <FlatList
          data={capsules}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.mood === "happy" && styles.cardHappy,
                item.mood === "neutral" && styles.cardNeutral,
                item.mood === "bad" && styles.cardBad,
              ]}
              onPress={() => navigation.navigate("Detail", { capsule: item })}>
              <Text style={styles.cardMood}>{MOOD_EMOJI[item.mood]}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewEntry")}>
        <Text style={styles.buttonText}>+ New capsule</Text>
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
  empty: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#888",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHappy: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  cardNeutral: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  cardBad: {
    borderLeftWidth: 4,
    borderLeftColor: "#e94560",
  },
  cardMood: {
    fontSize: 24,
    marginBottom: 4,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  cardDate: {
    color: "#888",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#e94560",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
