import { useEffect } from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

export const randomNumber = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useTiming = (state: boolean | number, config?: WithTimingConfig) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};
