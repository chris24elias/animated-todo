import React from 'react';
import { Box, Checkbox, Text } from 'native-base';
import Animated, { Layout, SlideInRight } from 'react-native-reanimated';

export type ITaskCardProps = {
  task: any;
  index: number;
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, index }) => {
  return (
    <Animated.View entering={SlideInRight.delay(index * 100)} layout={Layout.springify()}>
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
        <Text marginLeft={'4'}>{task.task}</Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(TaskCard);
