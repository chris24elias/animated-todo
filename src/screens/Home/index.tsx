import { Box, Heading, Text, ScrollView } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { CategoryCard } from '../../components/CategoryCard';
import TaskCard from '../../components/TaskCard';
import { Header } from '../../components/Header';
import { AddTask } from './AddTask';

export type IHomeProps = {};

const TASKS = [
  {
    id: 1,
    task: 'Create a new template',
    color: '#F102FF',
  },
  {
    id: 2,
    task: 'Pay for rent',
    color: '#4587E0',
  },
  {
    id: 3,
    task: 'Daily meeting with team',
    color: '#4587E0',
  },
  {
    id: 4,
    task: 'check emials',
    color: '#4587E0',
  },
  {
    id: 5,
    task: 'Lunch with Emma',
    color: '#F102FF',
  },
  {
    id: 6,
    task: 'Meditation',
    color: '#4587E0',
  },
];

const CATEGORIES = [
  {
    id: 1,
    label: 'Business',
    numTasks: 40,
    color: '#F102FF',
  },
  {
    id: 1,
    label: 'Personal',
    numTasks: 18,
    color: '#4587E0',
  },
];

const Home: React.FC<IHomeProps> = () => {
  const [tasks, setTasks] = useState(TASKS);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const scrollviewRef = useRef<ScrollView>();

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, []);

  const onAddNewTask = (task: string) => {
    scrollviewRef.current?.scrollTo({ y: 0, animated: false });
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
        ref={scrollviewRef}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          fontSize={'xs'}
          paddingLeft={'5'}
          marginTop={'8'}
          color="gray.400"
          fontWeight={'bold'}
        >
          CATEGORIES
        </Text>
        <Box marginTop={'3'}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            paddingLeft={'5'}
            paddingY={'2'}
            horizontal
          >
            {CATEGORIES.map((val, i) => {
              return <CategoryCard key={i} category={val} />;
            })}
          </ScrollView>
        </Box>

        <Text
          fontSize={'xs'}
          paddingLeft={'5'}
          paddingY={'2'}
          marginTop={'4'}
          color="gray.400"
          fontWeight={'bold'}
        >
          TODAY's TASKS
        </Text>
        <Box marginTop={'2'}>
          <Box paddingX={'5'}>
            {tasks.map((task, i) => {
              return <TaskCard key={task.id} task={task} index={i} useAnimation={!isFirstRender} />;
            })}
          </Box>
        </Box>
      </ScrollView>

      <AddTask addNewTask={onAddNewTask} />
    </Box>
  );
};

export { Home };
