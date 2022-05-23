import { Box, Heading, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import { CategoryCard } from '../../components/CategoryCard';
import TaskCard from '../../components/TaskCard';
import { Header } from '../../components/Header';
import { AddTask } from './AddTask';

export type IHomeProps = {};

const TASKS = [
  {
    id: 1,
    task: 'Create a new template',
  },
  {
    id: 2,
    task: 'Pay for rent',
  },
  {
    id: 3,
    task: 'Daily meeting with team',
  },
  {
    id: 4,
    task: 'check emials',
  },
  {
    id: 5,
    task: 'Lunch with Emma',
  },
  {
    id: 6,
    task: 'Meditation',
  },
];

const Home: React.FC<IHomeProps> = () => {
  const [tasks, setTasks] = useState(TASKS);

  const onAddNewTask = (task: string) => {
    setTasks([
      {
        task,
        id: tasks.length + 1,
      },
      ...tasks,
    ]);
  };

  return (
    <Box flex={1} style={{ backgroundColor: '#FAFBFF' }}>
      <Header />
      <Heading size={'xl'} color="black" paddingLeft={'5'} marginTop={'5'}>
        What's up, Joy!
      </Heading>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
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
          <Box paddingX={'5'}>
            {tasks.map((task, i) => {
              return <TaskCard key={task.id} task={task} index={i} />;
            })}
          </Box>
        </Box>
      </ScrollView>

      <AddTask addNewTask={onAddNewTask} />
    </Box>
  );
};

export { Home };
