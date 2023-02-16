import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ActivityIndicator } from 'react-native';

const OrderWaitingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    let timer = null;

    timer = setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View>
        <Image
          style={{ width: 240, height: 240 }}
          source={require('../assets/gifs/orderProcessing.gif')}
        />
      </View>
      <View>
        <Text className="text-base my-10 font-light text-center px-2">
          Waiting for Restaurant to accept your order!
        </Text>
      </View>
      <View>
        <ActivityIndicator size="large" color="#00CCBB" />
      </View>
    </SafeAreaView>
  );
};

export default OrderWaitingScreen;
