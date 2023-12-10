import './App.css';
import { Box, Flex, Input, InputGroup, Stack, Switch, Text, useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import Header from './components/header';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Todolist from './components/todolist';
import Filter from './components/filter';

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
  let [dark, setDark] = useState(true)
  let [todo, setTodo] = useState(JSON.parse(localStorage.getItem('data')) || null)
  let [newTask, setNewTask] = useState(undefined)
  const toast = useToast()
  let [active,setActive]=useState(1)
  const ref=useRef()
  // to showing toast
  const Showtoast = (type, msg) => {
    toast({
      title: `${msg == 'Mark as Pending!' ? 'PENDING' : type.toUpperCase()}`,
      description: msg,
      status: type,
      duration: 3000,
      isClosable: true,
      position: 'top'
    })
  }
  // function to handel input changes
  const handelInputChange = (e) => {
    setNewTask(e.target.value)
  }
  // function to add a new task on click add button
  const handelAddbtn = () => {
    console.log(newTask)
    if (newTask === undefined || newTask === "" || newTask === " ") {
      Showtoast('error', 'Please Enter Valid Task...')
      return
    }
    let data = JSON.parse(localStorage.getItem('data'))
    let max = 0
    data.map((el, ind) => {
      max = Math.max(max, el.id)
    })
    let newObj = {
      'completed': false,
      'id': max + 1,
      'title': newTask,
      'userId': max + 1
    }
    data.unshift(newObj)
    localStorage.setItem('data', JSON.stringify(data))
    setTodo([...data])
    ref.current.value=""
   setNewTask("")  // to clear the input data
    Showtoast('success', "New task added successfully!")
    setActive(1)
   
  }


  // initial todo task default task fetch from api
  useEffect(() => {
    if(todo===null){
      fetchTodos()
      .then((res) => {
        setTodo([...res])
        localStorage.setItem('data', JSON.stringify(res))
      })
    }
  }, [])



  return (
    <Box  w={'100vw'}
      h={'100vh'}
      bg={dark ? '#23272f' : '#fff'} position={'relative'}>
      <Box w={['100%', '100%', '50%']} h={'90%'}
        borderRadius={10}
        bg={'transparent'}
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%,-50%)'}
        padding={5}
      // boxShadow={'md'}
      >
        <Header dark={dark} setDark={setDark} />

        {/* input new todo task here */}
        <Box>
          <InputGroup
            bg={dark ? '#24273d' : 'transparent'}
            mt={5} display={'flex'}
            alignItems={'center'}
            color={dark ? 'white' : 'black'}
          >
            <Input fontSize={'14PX'} h={14}
            ref={ref}
              placeholder='Enter a new task here...'
              border={'1px solid gray'}
              mr={2}
              // value={newTask}
              onChange={(e) => {
                handelInputChange(e)
              }}
            />
            <Input
              fontSize={'14PX'}
              border={'1px solid gray'}
              cursor={'pointer'}
              h={14} w={40} type='button' value={'Add'}
              onClick={() => {
                handelAddbtn()
              }}
            />
          </InputGroup>
        </Box>
            {/* filter section  */}
              <Filter dark={dark} todo={todo} 
              active={active} setActive={setActive}
              setTodo={setTodo}/>

        {/* all todo listing  */}
        <Todolist 
        active={active}
        setTodo={setTodo} todo={todo} dark={dark} Showtoast={Showtoast} />
      </Box>
    </Box>
  );
}

export default App;
