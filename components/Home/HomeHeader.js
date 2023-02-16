import Button from '../Ui/Button';
import { View, Text, Image } from 'react-native';
import { UserIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

const HomeHeader = () => {
  return (
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
      <Image
        source={{ uri: 'https://links.papareact.com/wru' }}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
      />
      <View className="flex-1 flex-row space-x-0.5">
        <View>
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-lg leading-6">Current Location</Text>
        </View>
        <View className="self-end pb-1">
          <Button>
            <ChevronDownIcon size={15} color="#00CC88" />
          </Button>
        </View>
      </View>
      <View>
        <Button>
          <UserIcon size={26} color="#00CC88" />
        </Button>
      </View>
    </View>
  );
};

export default HomeHeader;
