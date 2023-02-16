import React from 'react';
import MapView from 'react-native-maps';
import { useSelector } from 'react-redux';
import Button from '../components/Ui/Button';
import { View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon, PhoneIcon } from 'react-native-heroicons/solid';
import { selectCurrentRestaurant } from '../features/restaurant/restaurantSlice';
import { useGetRestaurantsQuery } from '../features/restaurant/restaurantApiSlice';

const DeliveryScreen = () => {
  const navigation = useNavigation();

  const currentRestaurant = useSelector(selectCurrentRestaurant);

  const { restaurant } = useGetRestaurantsQuery('getRestaurants', {
    selectFromResult: ({ data }) => ({
      restaurant: data?.entities[currentRestaurant?.id],
    }),
  });

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <View>
            <Button onPress={() => navigation.navigate('Home')}>
              <XMarkIcon color="white" size={30} />
            </Button>
          </View>
          <View>
            <Text className="text-white font-light text-lg">Order Help</Text>
          </View>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 shadow-md z-50">
          <View className="flex-row justify-between items-center">
            <View>
              <View>
                <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              </View>
              <View>
                <Text className="text-3xl font-bold">45-55 Minutes</Text>
              </View>
            </View>
            <View>
              <Image
                style={{ width: 75, height: 75 }}
                source={{ uri: 'https://links.papareact.com/fls' }}
              />
            </View>
          </View>
          <View>
            <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          </View>
          <View className="mt-3">
            <Text className="text-gray-500">
              Your Order at {restaurant?.name} is being prepared
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <MapView
        mapType="mutedStandard"
        className="flex-1 -mt-10 z-0"
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
      <View className="bg-white flex-row space-x-5 items-center h-24">
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            className="bg-gray-300 p-4 rounded-full ml-5"
            source={{ uri: 'https://links.papareact.com/wru' }}
          />
        </View>
        <View className="flex-1">
          <View>
            <Text className="text-lg">Dave Jiggs</Text>
          </View>
          <View>
            <Text className="text-gray-400">Your rider</Text>
          </View>
        </View>
        <View className="mr-5">
          <View className="border border-gray-100 p-2 rounded-full">
            <Button>
              <PhoneIcon size={25} color="#00CCBB" />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
