import { View, Text } from 'react-native';
import Button from '../../components/Ui/Button';
import { useRoute } from '@react-navigation/native';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { useGetRestaurantsQuery } from '../../features/restaurant/restaurantApiSlice';
import {
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid';

const RestaurantInfo = () => {
  const { params } = useRoute();

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: data?.entities[params.restaurantId],
    }),
  });

  return (
    <View className="bg-white">
      <View className="px-4">
        <View className="pt-4">
          <Text className="font-bold text-2xl">{restaurant?.name}</Text>
        </View>
        <View className="flex-row space-x-2 my-1">
          <View className="flex-row items-center space-x-1">
            <View>
              <StarIcon color="green" size={20} opacity={0.5} />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">
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
              <MapPinIcon color="gray" size={20} opacity={0.5} />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">
                Nearby &#8226;{' '}
                {restaurant?.address?.length > 20
                  ? `${restaurant?.address?.substring(0, 20)}...`
                  : restaurant?.address?.substring(
                      0,
                      restaurant.address.length
                    )}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-2 pb-4">
          <Text className="text-gray-500">{restaurant?.description}</Text>
        </View>
      </View>
      <View>
        <Button>
          <View className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <View>
              <QuestionMarkCircleIcon color="green" size={20} opacity={0.6} />
            </View>
            <View className="flex-1 pl-2">
              <Text className="font-bold text-sm">Have a food allergy?</Text>
            </View>
            <View>
              <ChevronRightIcon color="#00CC88" />
            </View>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default RestaurantInfo;
