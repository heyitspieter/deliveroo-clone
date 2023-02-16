import Button from '../Ui/Button';
import { View, TextInput } from 'react-native';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';

const HomeSearch = () => {
  return (
    <View className="flex-row items-center space-x-2 pb-2 mx-4">
      <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1 items-center rounded">
        <View>
          <MagnifyingGlassIcon size={20} color="gray" />
        </View>
        <TextInput
          placeholder="Restaurants and cuisines"
          keyboardType="default"
          className="flex-1"
        />
      </View>
      <Button>
        <AdjustmentsHorizontalIcon color="#00CC88" />
      </Button>
    </View>
  );
};

export default HomeSearch;
