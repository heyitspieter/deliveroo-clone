import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

const CategoryCard = ({ category }) => {
  const onCardClickHandler = () => {};

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onCardClickHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View className="relative">
          <View>
            <Image
              source={{ uri: category.imgUrl }}
              className="h-20 w-20 rounded"
            />
          </View>
          <View className="absolute bottom-1 left-1 z-20">
            <Text className="text-white font-bold capitalize">
              {category.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  pressed: {
    opacity: 0.7,
  },
});

export default CategoryCard;
