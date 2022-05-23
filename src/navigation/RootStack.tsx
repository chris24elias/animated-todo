import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { Drawer } from './Drawer';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeDrawer" component={Drawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export { RootStack };
