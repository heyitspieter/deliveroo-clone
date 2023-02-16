import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Search from '../components/Home/HomeSearch';
import Header from '../components/Home/HomeHeader';
import { View, Text, ScrollView } from 'react-native';
import Categories from '../components/Categories/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeaturedRow from '../components/FeaturedRow/FeaturedRow';
import {
  selectAllFeaturedItems,
  useGetFeaturedItemsQuery,
} from '../features/featured/featuredSlice';

const HomeScreen = ({ navigation }) => {
  const { isLoading, isError } = useGetFeaturedItemsQuery();

  const featuredItems = useSelector(selectAllFeaturedItems);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const renderFeaturedItems = featuredItems => {
    return featuredItems.map(item => {
      return <FeaturedRow key={item.id} featured={item} />;
    });
  };

  let featuredRow = null;

  if (isLoading) {
    featuredRow = <View></View>;
  }

  if (isError) {
    featuredRow = (
      <View>
        <Text>Failed to load featured data</Text>
      </View>
    );
  }

  featuredRow = renderFeaturedItems(featuredItems);

  return (
    <SafeAreaView className="bg-white flex-1 pt-3">
      <View>
        <Header />
        <Search />
      </View>
      <View className="flex-1 bg-gray-100">
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Categories />
          {featuredRow}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
