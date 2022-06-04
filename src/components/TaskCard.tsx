import React from 'react';
import { Box, Checkbox, Text } from 'native-base';
import Animated, { Layout, withDelay, withTiming } from 'react-native-reanimated';

export type ITaskCardProps = {
  task: any;
  index: number;
  useAnimation: boolean;
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, useAnimation }) => {
  const entering = (values) => {
    'worklet';
    const duration = 300;
    const animations = {
      originY: withDelay(25, withTiming(values.targetOriginY, { duration: duration })),
      originX: withDelay(25, withTiming(values.targetOriginX, { duration: duration })),
      transform: [{ scale: withDelay(25, withTiming(1, { duration: duration })) }],
    };
    const initialValues = {
      // originX: -width,
      originY: -80,
      originX: 90,
      // opacity: 0,
      // borderRadius: 10,
      transform: [{ scale: 1.76 }],
    };
    return {
      initialValues,
      animations,
    };
  };
  return (
    <Animated.View
      entering={useAnimation ? entering : undefined}
      // entering={SlideInRight.delay(index * 100)}
      layout={Layout.springify()}
    >
      <Box
        borderRadius="2xl"
        bg={'white'}
        shadow={'1'}
        width={'full'}
        height={'16'}
        marginY={'1'}
        flexDirection={'row'}
        alignItems={'center'}
        padding={'3'}
      >
        <Checkbox value="" accessibilityLabel="This is a dummy checkbox" />
        <Text marginLeft={'4'} color="darkBorder" fontWeight={'500'}>
          {task.task}
        </Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(TaskCard);
