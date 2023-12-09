import './App.css';
import {Box,Input,InputGroup, Stack, Switch} from '@chakra-ui/react'
import {  useEffect, useState } from 'react';
import Header from './components/header';

// Function to fetch todos from API
async function fetchTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}


function App() {
  let[dark,setDark]=useState(true)
  let[todo,setTodo]=useState([])


  useEffect(()=>{
    fetchTodos()
    .then((res)=>{
      setTodo([...res])
    })
  })
  return (
    <Box className="App" w={'100vw'}
    h={'100vh'}
    bg={dark ?'#23272f' : '#fff'} position={'relative'}>
       <Box w={'50%'} h={'70%'}
       borderRadius={10}
       bg={'transparent'}
       position={'absolute'}
       top={'50%'}
       left={'50%'}
       transform={'translate(-50%,-50%)'}
       padding={5}
       boxShadow={'md'}
       >
          <Header dark={dark} setDark={setDark}/>

          {/* input new todo task here */}
          <Box>
            <InputGroup
            bg={dark ? '#24273d' :'transparent'}
            mt={5} display={'flex'} 
            alignItems={'center'}
            fontSize={'20px'}>
            <Input  h={14} 
            placeholder='Enter a new task heare...'/>
            <Input
            cursor={'pointer'}
            color={dark ? 'white' : 'black'}
            h={14} w={40} type='button' value={'Add'}/>
            </InputGroup>
          </Box>
          {/* all todo listing  */}
          <Box mt={5} h={'350px'} overflowY={'auto'}
          className={`scroll ${dark ? 'dark' :'light'}`}
          display={'grid'}
          gap={5}
          >
              {
                todo.map((el,ind)=>{
                  return <Box key={el.id}
                  p={5}
                  borderRadius={10}
                  bg={dark ? '#24273d' :'white'}

                  >
                    <Stack>
                    <Switch colorScheme='green'
                    size={'md'}
                     id='isChecked' isChecked={el.completed} />
                    </Stack>
                  </Box>
                })
              }

          </Box>
       </Box>
    </Box>
  );
}

export default App;
