import React from 'react';
import { View } from 'react-native';
import { Home } from '../screens/Home';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Avatar, Box, Heading, Row, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

export type IDrawerProps = {};

const DrawerNav = createDrawerNavigator();

const Drawer: React.FC<IDrawerProps> = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0C2260' }}>
      <LinearGradient
        colors={['#153aa4', '#0C2260']}
        start={{ x: 0.1, y: 0.2 }}
        style={{ flex: 1 }}
      >
        <DrawerNav.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerType: 'slide',
            overlayColor: 'transparent',
            drawerStyle: {
              flex: 1,
              width: '65%',
              paddingRight: 20,
              backgroundColor: 'transparent',
            },
            sceneContainerStyle: {
              backgroundColor: 'transparent',
            },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <DrawerNav.Screen
            name="Home"
            component={WrapDrawerScreen(Home)}
            options={() => {
              return {
                headerShown: false,
              };
            }}
          />
        </DrawerNav.Navigator>
      </LinearGradient>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView scrollEnabled={true} {...props}>
        {/* <View style={{ flex: 1, paddingHorizontal: 10 }}></View> */}
        <Avatar
          marginTop={'5'}
          alignSelf={'center'}
          borderWidth={'3'}
          borderColor={'trueGray.600'}
          padding={'1.5'}
          size={'xl'}
          bg={'transparent'}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        >
          AJ
        </Avatar>
        <Heading color={'white'} size={'xl'} alignSelf={'center'} marginTop={'5'}>
          Joy{'\n'}Mitchell
        </Heading>
        <Box style={{ flex: 1 }} mt="l">
          {['Templates', 'Categories', 'Analytics', 'Settings'].map((val, i) => {
            return (
              <Row ml="xl" key={String(i)} mb="m">
                <FontAwesome name="bookmark" size={24} color="white" />
                <Text ml="m" color="white">
                  {val}
                </Text>
              </Row>
            );
          })}
        </Box>
      </DrawerContentScrollView>
    </View>
  );
};

export const WrapDrawerScreen: (Screen: any) => React.FC = (Screen) => {
  return (props) => {
    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(progress.value, [0, 1], [1, 0.85], Extrapolate.CLAMP);
      const borderRadius = interpolate(progress.value, [0, 1], [1, 20], Extrapolate.CLAMP);
      return {
        borderRadius,
        transform: [{ scale }],
      };
    });

    return (
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: 'white',
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <Screen {...props} />
      </Animated.View>
    );
  };
};

export { Drawer };
