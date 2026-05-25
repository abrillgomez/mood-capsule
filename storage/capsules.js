import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "capsules";

export const getCapsules = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCapsule = async (capsule) => {
  const existing = await getCapsules();
  const updated = [capsule, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const hasTodayCapsule = async () => {
  const capsules = await getCapsules();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return capsules.some((c) => c.date === today);
};
