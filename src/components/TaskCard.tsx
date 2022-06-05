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
    const delay = 175;
    const animations = {
      originY: withDelay(delay, withTiming(values.targetOriginY, { duration: duration })),
      originX: withDelay(delay, withTiming(values.targetOriginX, { duration: duration })),
      transform: [{ scale: withDelay(delay, withTiming(1, { duration: duration })) }],
    };
    const initialValues = {
      // originX: -width,
      originY: -100,
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

  //#4587E0
  //#F102FF
  return (
    <Animated.View
      entering={useAnimation ? entering : undefined}
      // entering={SlideInRight.delay(index * 100)}
      layout={Layout.springify().stiffness(100).damping(20)}
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
        <Checkbox
          value=""
          accessibilityLabel="This is a dummy checkbox"
          borderRadius={'full'}
          _checked={{
            bg: task.color,
            borderColor: task.color,
            // borderWidth: 0,
          }}
          _unchecked={{
            borderColor: task.color,
            bg: task.color,
          }}
          borderColor={task.color}
        />
        <Text marginLeft={'4'} color="text" fontWeight={'500'}>
          {task.task}
        </Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(TaskCard);
