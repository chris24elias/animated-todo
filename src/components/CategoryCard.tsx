import React from 'react';
import { VStack, Box, Text } from 'native-base';
export type ICategoryCardProps = {};

const CategoryCard: React.FC<ICategoryCardProps> = () => {
  return (
    <Box
      // borderWidth="1"
      borderRadius="2xl"
      bg={'white'}
      shadow={'1'}
      width={'48'}
      height={'24'}
      marginX={'2'}
    >
      <VStack space="4">
        <Box px="4" pt="4">
          <Text fontSize={'xs'}>40 tasks</Text>
        </Box>
        <Box px="4">Business</Box>
      </VStack>
    </Box>
  );
};

export { CategoryCard };
