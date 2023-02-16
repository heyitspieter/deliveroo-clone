import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Restaurant/RestaurantHeader';
import BasketPopup from '../components/BasketPopup/BasketPopup';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantInfo from '../components/Restaurant/RestaurantInfo';
import { setCurrentId } from '../features/restaurant/restaurantSlice';

const RestaurantScreen = () => {
  const { params } = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentId({ id: params.restaurantId }));
  }, [params.restaurantId]);

  const ListHeaderComponent = <Header />;
  const ListFooterComponent = (
    <>
      <RestaurantInfo />
      <RestaurantMenu />
    </>
  );

  return (
    <>
      <View className="flex-1">
        <FlatList
          data={[]}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
      <BasketPopup />
    </>
  );
};

export default RestaurantScreen;
