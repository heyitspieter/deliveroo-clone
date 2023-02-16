import Button from '../Ui/Button';
import { View, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetRestaurantsQuery } from '../../features/restaurant/restaurantApiSlice';

const RestaurantHeader = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: data?.entities[params.restaurantId],
    }),
  });

  return (
    <View className="relative">
      <View>
        <Image className="w-full h-56" source={{ uri: restaurant.imgUrl }} />
      </View>
      <View className="absolute top-14 left-5 p-2 rounded-full bg-gray-100">
        <Button onPress={() => navigation.navigate('Home')}>
          <ArrowLeftIcon size={22} color="#00CC88" />
        </Button>
      </View>
    </View>
  );
};

export default RestaurantHeader;
