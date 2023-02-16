import Button from '../Ui/Button';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useGetDishesQuery } from '../../features/dish/dishSlice';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { selectCurrentRestaurant } from '../../features/restaurant/restaurantSlice';
import {
  addToBasket,
  updateQuantity,
  selectItemById,
} from '../../features/basket/basketSlice';

const DishRow = ({ id }) => {
  const dispatch = useDispatch();

  const [basketQty, setBasketQty] = useState(0);

  const currentRestaurant = useSelector(selectCurrentRestaurant);

  const basketItem = useSelector(state =>
    selectItemById(state, currentRestaurant.id)
  );

  const [isPressed, setIsPressed] = useState(false);

  const { dish } = useGetDishesQuery('getDishes', {
    selectFromResult: ({ data }) => ({
      dish: data?.entities[id],
    }),
  });

  useEffect(() => {
    if (basketItem) {
      const item = basketItem.dishes.find(dish => dish.id === id);
      setBasketQty(item?.quantity || 0);
    }
  }, [id, basketItem]);

  const onAddToBasket = () => {
    dispatch(addToBasket({ dish, item: currentRestaurant }));
  };

  const onRemoveBasketItem = () => {
    dispatch(
      updateQuantity({
        item: currentRestaurant,
        dish: { id: dish.id, quantity: basketQty - 1 },
      })
    );
  };

  return (
    <>
      <View
        className={`bg-white p-4 border-gray-200 border ${
          isPressed && 'border-b-0'
        }`}
      >
        <Button onPress={() => setIsPressed(!isPressed)}>
          <View className="flex-row">
            <View className="flex-1 pr-2">
              <View className="mb-1">
                <Text className="text-lg">{dish?.name}</Text>
              </View>
              <View>
                <Text className="text-gray-400">{dish?.description}</Text>
              </View>
              <View className="mt-2">
                <Text>£{dish?.price?.toFixed(2)}</Text>
              </View>
            </View>
            <View className="rounded" style={styles.imageContainer}>
              <Image
                style={{ width: 60, height: 60 }}
                className="bg-gray-400 rounded"
                source={{
                  uri: dish?.imgUrl,
                }}
              />
            </View>
          </View>
        </Button>
      </View>
      {isPressed && (
        <View className="bg-white">
          <View className="pb-3 px-4">
            <View className="flex-row items-center">
              <Button onPress={onRemoveBasketItem} disabled={basketQty <= 0}>
                <MinusCircleIcon
                  size={40}
                  color={`${basketQty <= 0 ? 'gray' : '#00ccbb'}`}
                />
              </Button>
              <View className="mx-2">
                <Text>{basketQty}</Text>
              </View>
              <Button onPress={onAddToBasket}>
                <PlusCircleIcon size={40} color="#00ccbb" />
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#f3f3f4',
  },
});

export default DishRow;
