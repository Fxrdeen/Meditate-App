import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmations-gallery";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

const AffermationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmations, setaffirmations] = useState<GalleryPreviewData>();
  const [sentences, setsentences] = useState<string[]>();
  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const data = AFFIRMATION_GALLERY[idx].data;
      const affirmationStart = data.find((a) => a.id === Number(itemId));
      if (affirmationStart) {
        setaffirmations(affirmationStart);
        const affirmationsArray = affirmationStart.text.split(".");
        if (affirmationsArray[affirmationsArray.length - 1] === "") {
          affirmationsArray.pop();
        }
        setsentences(affirmationsArray);
        return;
      }
    }
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmations?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>
          <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences?.map((s, id) => (
                  <Text
                    key={id}
                    className="text-white text-3xl font-bold mb-10"
                  >
                    {s}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffermationPractice;
