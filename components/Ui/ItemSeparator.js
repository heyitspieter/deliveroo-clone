import { View, StyleSheet } from 'react-native';

const ItemSeparator = ({ style }) => {
  return <View style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  separator: {
    marginRight: 8,
  },
});

export default ItemSeparator;
