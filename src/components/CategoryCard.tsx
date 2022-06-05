import React from 'react';
import { VStack, Box, Text } from 'native-base';
export type ICategoryCardProps = {};

const CategoryCard: React.FC<ICategoryCardProps> = ({ category }) => {
  const { label, numTasks, color } = category;
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
          <Text fontSize={12} color="gray.400" fontWeight={'400'}>
            {numTasks} tasks
          </Text>
          <Text fontWeight={'600'} fontSize={18}>
            {label}
          </Text>
        </Box>
        <Box
          borderRadius={'full'}
          style={{
            height: 3,

            width: '85%',

            alignSelf: 'center',
          }}
          bg="gray.200"
        >
          <Box
            borderRadius={'full'}
            style={{
              height: '100%',
              width: '40%',
            }}
            bg={color}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export { CategoryCard };
