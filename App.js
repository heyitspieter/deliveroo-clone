import { store } from './app/store';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import { dishApiSlice } from './features/dish/dishSlice';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderWaitingScreen from './screens/OrderWaitingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { categoryApiSlice } from './features/category/categorySlice';
import { featuredItemsApiSlice } from './features/featured/featuredSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { restaurantApiSlice } from './features/restaurant/restaurantApiSlice';

const Stack = createNativeStackNavigator();

store.dispatch(dishApiSlice.endpoints.getDishes.initiate());
store.dispatch(categoryApiSlice.endpoints.getCategories.initiate());
store.dispatch(restaurantApiSlice.endpoints.getRestaurants.initiate());
store.dispatch(featuredItemsApiSlice.endpoints.getFeaturedItems.initiate());

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              animation: Platform.OS === 'ios' ? 'default' : 'fade',
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animation: 'fade_from_bottom',
              }}
            />
            <Stack.Screen
              name="OrderWaiting"
              component={OrderWaitingScreen}
              options={{
                animation: 'fade',
                headerShown: false,
                presentation: 'fullScreenModal',
              }}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{
                animation: 'fade',
                headerShown: false,
                presentation: 'fullScreenModal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
