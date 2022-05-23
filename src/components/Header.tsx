import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, IconButton } from 'native-base';
import React from 'react';

export type IHeaderProps = {};

const Header: React.FC<IHeaderProps> = () => {
  const navigation = useNavigation();
  return (
    <>
      <Box safeAreaTop bg="#FAFBFF" />
      <HStack
        bg="#FAFBFF"
        px="5"
        paddingTop="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <MaterialCommunityIcons
            name="menu"
            size={24}
            color="black"
            style={
              {
                // marginLeft: 20,
              }
            }
            onPress={() => navigation.openDrawer()}
          />
          {/* <Text color="black" fontSize="20" fontWeight="bold">
            Home
          </Text> */}
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="black" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="black" />} />
          {/* <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size="sm"
                color="black"
              />
            }
          /> */}
        </HStack>
      </HStack>
    </>
  );
};

export { Header };
