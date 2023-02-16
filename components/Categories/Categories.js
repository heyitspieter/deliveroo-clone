import { useSelector } from 'react-redux';
import ItemSeparator from '../Ui/ItemSeparator';
import CategoryCard from '../CategoryCard/CategoryCard';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from '../../features/category/categorySlice';

const Categories = () => {
  const { isLoading, isError } = useGetCategoriesQuery();

  const categories = useSelector(selectAllCategories);

  const renderCardItems = itemData => {
    return <CategoryCard category={itemData.item} />;
  };

  if (isLoading) {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Failed to load data</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      horizontal={true}
      renderItem={renderCardItems}
      ItemSeparatorComponent={ItemSeparator}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});

export default Categories;
