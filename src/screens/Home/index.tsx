import { Box, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { CategoryCard } from '../../components/CategoryCard';
import { TaskCard } from '../../components/TaskCard';
import { Header } from '../../components/Header';
import { AddTask } from './AddTask';

export type IHomeProps = {};

const Home: React.FC<IHomeProps> = () => {
  return (
    <Box flex={1} style={{ backgroundColor: '#FAFBFF' }}>
      <Header />
      <Heading size={'xl'} color="black" paddingLeft={'5'} marginTop={'5'}>
        What's up, Joy!
      </Heading>
      <Text fontSize={'xs'} paddingLeft={'5'} marginTop={'5'}>
        CATEGORIES
      </Text>
      <Box marginTop={'2'}>
        <ScrollView paddingLeft={'5'} paddingY={'2'} horizontal>
          {[1, 2, 3, 4].map(() => {
            return <CategoryCard />;
          })}
        </ScrollView>
      </Box>

      <Text fontSize={'xs'} paddingLeft={'5'} paddingY={'2'} marginTop={'5'}>
        TODAY's TASKS
      </Text>
      <Box marginTop={'2'}>
        <ScrollView paddingX={'5'}>
          {[1, 2, 3, 4].map(() => {
            return <TaskCard />;
          })}
        </ScrollView>
      </Box>
      <AddTask />
    </Box>
  );
};

export { Home };
