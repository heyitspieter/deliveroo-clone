import Button from '../Ui/Button';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentRestaurant } from '../../features/restaurant/restaurantSlice';
import { useGetRestaurantsQuery } from '../../features/restaurant/restaurantApiSlice';
import {
  selectBasketTotal,
  selectBasketTotalItems,
} from '../../features/basket/basketSlice';

const BasketPopup = () => {
  const navigation = useNavigation();

  const currentRestaurant = useSelector(selectCurrentRestaurant);

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: currentRestaurant.id
        ? data?.entities[currentRestaurant.id]
        : null,
    }),
  });

  const basketTotal = useSelector(state =>
    selectBasketTotal(state, restaurant)
  );

  const basketTotalItems = useSelector(state =>
    selectBasketTotalItems(state, restaurant)
  );

  if (!basketTotalItems) return null;

  return (
    <View className="absolute z-50 left-5 right-5 bottom-5">
      <Button onPress={() => navigation.navigate('Basket')}>
        <View className="flex-row items-center space-x-2 bg-[#00ccbb] rounded-lg p-4">
          <View className="bg-[#01A296] py-1 px-2 rounded">
            <Text className="text-white font-extrabold text-lg">
              {basketTotalItems}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-extrabold text-center">
              View Basket
            </Text>
          </View>
          <View>
            <Text className="text-lg text-white font-extrabold">
              £{basketTotal ? basketTotal.toFixed(2) : 0}
            </Text>
          </View>
        </View>
      </Button>
    </View>
  );
};

export default BasketPopup;
