import DishRow from '../DishRow/DishRow';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';
import { useGetRestaurantsQuery } from '../../features/restaurant/restaurantApiSlice';

const RestaurantMenu = () => {
  const { params } = useRoute();

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: data?.entities[params.restaurantId],
    }),
  });

  const renderDishItems = itemData => {
    return <DishRow id={itemData.item.id} />;
  };

  return (
    <View className="pt-6 pb-32">
      <View className="px-4 mb-3">
        <Text className="font-bold text-xl">Menu</Text>
      </View>
      <FlatList data={restaurant.dishes} renderItem={renderDishItems} />
    </View>
  );
};

export default RestaurantMenu;
