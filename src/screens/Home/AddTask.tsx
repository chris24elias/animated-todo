import { Box, Pressable, Row, Text, useTheme } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
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
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

export type IAddTaskProps = {
  addNewTask: (text: string) => void;
};

const AddTask: React.FC<IAddTaskProps> = ({ addNewTask }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<any>(-1);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [text, setText] = useState('');
  const containerOpacity = useSharedValue(0);
  const progress = useSharedValue(0);

  const onNewTaskPress = () => {
    addNewTask(text);

    setTimeout(() => {
      containerOpacity.value = withTiming(0, { duration: 400 });
      opacity.value = withTiming(0, { duration: 200 });
    }, 50);

    setTimeout(() => {
      setVisible(false);
      setText('');
    }, 1000);
  };

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: 450,
      easing: Easing.inOut(Easing.ease),
    });
    containerOpacity.value = withTiming(visible ? 1 : 0);
  }, [visible]);

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
    setBtnLayout(e.nativeEvent.layout);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const size = screenHeight * 2;
    const height = interpolate(progress.value, [0, 1], [btnLayout.height, size]);
    const width = interpolate(progress.value, [0, 1], [btnLayout.height, size]);
    const offset = size / 2 - screenWidth / 2;
    const x = interpolate(progress.value, [0, 1], [btnLayout.x, -offset]);
    const y = interpolate(progress.value, [0, 1], [btnLayout.y, -offset]);

    return {
      opacity: containerOpacity.value,
      borderRadius: size / 2,
      height,
      width,
      top: y,
      left: x,
      backgroundColor: 'white',
      zIndex: 9,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
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
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 10,
      justifyContent: 'center',
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Animated.View style={[buttonStyle]} onLayout={onButtonLayout}>
        <Pressable
          onPress={toggleVisible}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          shadow={'8'}
        >
          <MaterialIcons name="add" size={32} color="white" />
        </Pressable>
      </Animated.View>

      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
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
        >
          <MaterialIcons name="close" size={24} />
        </Pressable>

        <MotiView
          delay={visible ? 250 : 0}
          animate={{ translateY: !visible ? -20 : 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{ width: '100%', paddingLeft: theme.space[10] }}
        >
          <Box marginBottom={'10'}>
            <TextInput
              placeholder="Enter  new task"
              value={text}
              onChangeText={setText}
              style={{
                height: 35,
                width: 250,
                fontWeight: '500',
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                borderWidth: 0,
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
        </MotiView>
        <MotiView
          delay={visible ? 280 : 0}
          // from={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0, translateY: !visible ? -50 : 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{
            position: 'absolute',
            bottom: insets.bottom + 15,
            right: 30,
          }}
        >
          <Pressable
            onPress={onNewTaskPress}
            flexDirection={'row'}
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
        </MotiView>
      </Animated.View>
    </>
  );
};

export { AddTask };
