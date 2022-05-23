import React from 'react';
import { Box, Checkbox, Text } from 'native-base';

export type ITaskCardProps = {};

const TaskCard: React.FC<ITaskCardProps> = () => {
  return (
    <Box
      // borderWidth="1"
      borderRadius="2xl"
      bg={'white'}
      shadow={'1'}
      width={'full'}
      height={'16'}
      marginY={'1'}
      flexDirection={'row'}
      //   justifyContent={"center"}
      alignItems={'center'}
      padding={'3'}
    >
      <Checkbox value="" accessibilityLabel="This is a dummy checkbox" />
      <Text marginLeft={'4'}>Daily meeting with team</Text>
    </Box>
  );
};

export { TaskCard };
