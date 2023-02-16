import React from 'react';
import Button from '../Ui/Button';
import { View, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket } from '../../features/basket/basketSlice';
import { selectCurrentRestaurant } from '../../features/restaurant/restaurantSlice';

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();

  const currentRestaurant = useSelector(selectCurrentRestaurant);

  const onRemoveItem = () => {
    dispatch(
      removeFromBasket({ dish: { id: item.id }, item: currentRestaurant })
    );
  };

  return (
    <View className="flex-row items-center space-x-3 bg-white px-5 py-2">
      <View>
        <Text>{item?.quantity}x</Text>
      </View>
      <View>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: item?.imgUrl }}
          className="rounded-full"
        />
      </View>
      <View className="flex-1">
        <Text>{item?.name}</Text>
      </View>
      <View>
        <Text className="text-gray-600">£{item.price.toFixed(2)}</Text>
      </View>
      <View>
        <Button onPress={onRemoveItem}>
          <Text className="text-[#00CCBB] text-sm">Remove</Text>
        </Button>
      </View>
    </View>
  );
};

export default BasketItem;
