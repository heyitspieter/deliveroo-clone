import React from 'react';
import Button from '../components/Ui/Button';
import { useSelector } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { View, Text, Image, FlatList } from 'react-native';
import BasketItem from '../components/BasketItem/BasketItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectCurrentRestaurant } from '../features/restaurant/restaurantSlice';
import { useGetRestaurantsQuery } from '../features/restaurant/restaurantApiSlice';
import {
  selectBasketTotal,
  selectRestaurantBasketItems,
} from '../features/basket/basketSlice';

const BasketScreen = ({ navigation }) => {
  const currentRestaurant = useSelector(selectCurrentRestaurant);

  const basketTotal = useSelector(state =>
    selectBasketTotal(state, currentRestaurant)
  );

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: currentRestaurant.id
        ? data?.entities[currentRestaurant.id]
        : null,
    }),
  });

  const basketItems = useSelector(state =>
    selectRestaurantBasketItems(state, restaurant)
  );

  const renderBasketItems = itemData => {
    return <BasketItem item={itemData.item} />;
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="bg-gray-100">
          <View className="p-5 border-b border-[#00CCBB] bg-white shadow-md">
            <View>
              <View>
                <Text className="text-lg font-bold text-center">Basket</Text>
              </View>
              <View>
                <Text className="text-center text-gray-400">
                  {restaurant?.name}
                </Text>
              </View>
            </View>
            <View className="absolute top-3 right-5">
              <Button onPress={() => navigation.goBack()}>
                <View className="rounded-full bg-gray-100">
                  <XCircleIcon color="#00CCBB" size={50} />
                </View>
              </Button>
            </View>
          </View>
          <View className="flex-row items-center space-x-4 px-4 py-3 bg-white mt-4">
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                source={{ uri: restaurant?.imgUrl }}
                className="bg-gray-300 rounded-full p-4"
              />
            </View>
            <View className="flex-1">
              <Text>Deliver in 50 - 70 mins</Text>
            </View>
            <View>
              <Button>
                <Text className="text-[#00CCBB]">Change</Text>
              </Button>
            </View>
          </View>
        </View>
        <View className="flex-1 mt-4">
          <FlatList
            data={basketItems || []}
            renderItem={renderBasketItems}
            ItemSeparatorComponent={<View className="border border-gray-100" />}
          />
        </View>
        <View className="p-5 mt-5 space-y-4 bg-white">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-400">Subtotal</Text>
            </View>
            <View>
              <Text className="text-gray-400">
                £{basketTotal ? basketTotal.toFixed(2) : 0}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-400">Delivery Fee</Text>
            </View>
            <View>
              <Text className="text-gray-400">£5.99</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text>Order Total</Text>
            </View>
            <View>
              <Text className="font-extrabold">
                £{basketTotal ? (basketTotal + 5.99).toFixed(2) : 0}
              </Text>
            </View>
          </View>
          <View className="rounded-lg bg-[#00CCBB] p-4">
            <Button onPress={() => navigation.navigate('OrderWaiting')}>
              <Text className="text-white text-center text-xl font-bold">
                Place Order
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
