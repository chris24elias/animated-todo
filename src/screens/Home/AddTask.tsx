import { Box, Pressable, Row, Text, useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useTiming } from '../../utils';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type IAddTaskProps = {
  // visible: boolean;
  //   btnLayout: {
  //     height: number;
  //     width: number;
  //     x: number;
  //     y: number;
  //   };
  // onClose: () => void;
  // progress: Animated.SharedValue<number>;
};

const AddTask: React.FC<IAddTaskProps> = () => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<any>(-1);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const progress = useTiming(visible, {
    duration: 450,
    easing: Easing.inOut(Easing.ease),
  });

  const toggleVisible = () => {
    const nextVal = !visible;
    clearTimeout(timeoutRef.current);
    if (nextVal) {
      setVisible(nextVal);
      timeoutRef.current = setTimeout(() => {
        opacity.value = withTiming(!visible ? 1 : 0);
      }, 280);
    } else {
      opacity.value = withTiming(!visible ? 1 : 0);
      timeoutRef.current = setTimeout(() => {
        setVisible(nextVal);
      }, 200);
    }
  };

  const [btnLayout, setBtnLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onButtonLayout = (e) => {
    console.log('e', e.nativeEvent.layout);
    setBtnLayout(e.nativeEvent.layout);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const size = screenHeight * 2;
    // const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    // const borderRadius = interpolate(
    //   progress.value,
    //   [0, 1],
    //   [size / 2, 0]
    // );
    const height = interpolate(progress.value, [0, 1], [btnLayout.height, size]);
    const width = interpolate(progress.value, [0, 1], [btnLayout.height, size]);
    const offset = size / 2 - screenWidth / 2;
    const x = interpolate(progress.value, [0, 1], [btnLayout.x, -offset]);
    const y = interpolate(progress.value, [0, 1], [btnLayout.y, -offset]);
    const bg = interpolateColor(progress.value, [0, 1], ['rgb(37, 99, 235)', 'rgb(255, 255, 255)']);
    const op = interpolate(progress.value, [0, 0.2, 1], [0, 1, 1]);
    return {
      opacity: op,
      borderRadius: size / 2,
      height,
      width,
      top: y,
      left: x,
      backgroundColor: bg,
      zIndex: 9,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    // const rotate = interpolate(progress.value, [0, 1], [0, 45]);
    const bg = interpolateColor(progress.value, [0, 1], ['#2563eb', '#1e3a8a']);
    const op = interpolate(progress.value, [0, 1], [1, 0]);
    return {
      opacity: op,
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 9,
      backgroundColor: bg,
      height: 64,
      width: 64,
      borderRadius: 64 / 2,
      // transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    // const opacity = interpolate(progress.value, [0, 0.8, 1], [0, 0, 1]);

    return {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 10,
      justifyContent: 'center',
      // alignItems: 'center',
      opacity: opacity.value,
    };
  });

  // const newTaskStyle = useAnimatedStyle(() => {
  //   return {};
  // });

  return (
    <>
      <Animated.View style={[buttonStyle]} onLayout={onButtonLayout}>
        <Pressable
          onPress={toggleVisible}
          // position={"absolute"}
          // height={"16"}
          // width={"16"}
          // borderRadius="full"
          flex={1}
          // bottom={"8"}
          // right={"8"}
          // bg={"blue.600"}
          justifyContent={'center'}
          alignItems={'center'}
          shadow={'8'}

          // zIndex={10}
        >
          <MaterialIcons name="add" size={32} color="white" />
        </Pressable>
      </Animated.View>

      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
            //   height,
            //   width,
            // backgroundColor: "white",
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      />
      <Animated.View style={contentStyle} pointerEvents={visible ? 'auto' : 'none'}>
        <Pressable
          onPress={toggleVisible}
          height={'12'}
          width={'12'}
          borderRadius="full"
          position="absolute"
          style={{
            top: insets.top + 20,
          }}
          right="6"
          borderWidth={2}
          justifyContent={'center'}
          alignItems={'center'}
          borderColor="border"

          // zIndex={10}
        >
          <MaterialIcons name="close" size={24} />
        </Pressable>
        <Box width={'100%'} pl="10">
          <Box marginBottom={'10'}>
            <TextInput
              placeholder="Enter  new task"
              style={{
                height: 35,
                width: 250,
                // borderWidth: 2,
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                // paddingLeft: 10,
                borderWidth: 0,
                // borderColor: 'white',
                fontSize: 26,
                color: theme.colors.darkBorder,
              }}
              autoFocus
            />
          </Box>

          <Row>
            <Box
              borderWidth={2}
              borderColor="border"
              borderRadius={'full'}
              style={{
                height: 60,
                flexDirection: 'row',
                // padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              width="32"
            >
              <MaterialIcons
                name="calendar-today"
                size={24}
                color={theme.colors.darkBorder}
                style={{
                  marginRight: 10,
                }}
              />
              <Text fontWeight={'bold'} color="darkBorder">
                Today
              </Text>
            </Box>
            <Box
              ml="2"
              borderWidth={2}
              borderColor="border"
              borderRadius={'full'}
              style={{
                height: 60,
                width: 60,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                borderRadius={'full'}
                style={{
                  borderWidth: 2,
                  height: 25,
                  width: 25,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                borderColor="primary"
              >
                <Box borderRadius={'full'} style={{ height: 15, width: 15 }} bg="primary" />
              </Box>
            </Box>
          </Row>
          <Row ml="16" mt="16" width={'40%'} justifyContent="space-between">
            <Feather name="folder-plus" size={24} color={theme.colors.darkBorder} />
            <MaterialIcons name="outlined-flag" size={24} color={theme.colors.darkBorder} />
            <Feather name="moon" size={24} color={theme.colors.darkBorder} />
          </Row>
        </Box>
        <Pressable
          style={{ position: 'absolute', bottom: insets.bottom + 15, right: 30 }}
          // mt="16"
          // alignSelf={'flex-end'}
          // mr="8"
          flexDirection={'row'}
          // py="4"
          height={60}
          borderRadius="full"
          shadow="3"
          justifyContent={'center'}
          alignItems="center"
          bg="primary"
          width={170}
        >
          <Text mr="4" fontWeight={'bold'} color="white">
            New task
          </Text>
          <Feather name="chevron-up" size={26} color="white" />
        </Pressable>
      </Animated.View>
    </>
  );
};

export { AddTask };
