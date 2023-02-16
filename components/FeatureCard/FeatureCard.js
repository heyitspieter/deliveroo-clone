import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useGetRestaurantsQuery } from '../../features/restaurant/restaurantApiSlice';

const FeatureCard = ({ itemId }) => {
  const navigation = useNavigation();

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: data?.entities[itemId],
    }),
  });

  const onCardClickHandler = () =>
    navigation.navigate('Restaurant', { restaurantId: restaurant?.id });

  return (
    <View className="bg-white shadow rounded-b">
      <Pressable
        onPress={onCardClickHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.imageContainer}>
          <Image
            className="rounded"
            style={{ width: 220, height: 150 }}
            source={{ uri: restaurant?.imgUrl }}
          />
        </View>
        <View className="px-3 pt-1 pb-4">
          <View className="pt-2">
            <Text className="text-lg font-bold">{restaurant?.name}</Text>
          </View>
          <View className="flex-row items-center space-x-1 my-2">
            <View>
              <StarIcon color="green" opacity={0.5} size={22} />
            </View>
            <View>
              <Text className="text-gray-500">
                <Text className="text-green-500">
                  {restaurant?.rating?.toFixed(1)}
                </Text>{' '}
                &#8226;{' '}
                <Text className="capitalize">{restaurant?.category}</Text>
              </Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-1">
            <View>
              <MapPinIcon color="gray" opacity={0.4} size={22} />
            </View>
            <View>
              <Text className="text-xs text-gray-500">
                Nearby &#8226;{' '}
                {restaurant?.address?.length > 20
                  ? `${restaurant?.address?.substring(0, 20)}..`
                  : restaurant?.address}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: 220,
    height: 150,
  },
});

export default FeatureCard;
