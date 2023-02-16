import ItemSeparator from '../Ui/ItemSeparator';
import FeatureCard from '../FeatureCard/FeatureCard';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FeaturedRow = ({ featured }) => {
  const restaurants = featured.restaurants.map(restaurant => ({
    ...restaurant,
    key: restaurant.id,
  }));

  const renderCardItems = itemData => {
    return <FeatureCard itemId={itemData.item.id} />;
  };

  return (
    <View>
      <View className="flex-row justify-between mt-4 px-4 items-center">
        <View>
          <Text className="font-bold text-lg">{featured?.title}</Text>
        </View>
        <View>
          <ArrowRightIcon color="#00CC88" />
        </View>
      </View>
      <View className="px-4">
        <Text className="text-xs text-gray-500">{featured?.description}</Text>
      </View>
      <View className="pt-4">
        <FlatList
          horizontal={true}
          data={restaurants}
          renderItem={renderCardItems}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
  },
});

export default FeaturedRow;
