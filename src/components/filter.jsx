import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Filter({dark,todo,setTodo,active,setActive}) {
    let [pendinttask,setPending]=useState(0)

    // functon to clear all completed task
    const clearCompleted=()=>{
        let data=JSON.parse(localStorage.getItem('data'))
        let newData=data.filter((el,ind)=>{
            return el.completed!==true
        })
        localStorage.setItem('data',JSON.stringify(newData))
        setTodo([...newData])
        setActive(1)
    }

    // function to filter task list 
    const filterTask=(event)=>{
        setActive(event)
        if(event===1){
            setTodo([...JSON.parse(localStorage.getItem('data'))])
        }else if(event===2){
            let data=JSON.parse(localStorage.getItem('data'))
            let newData=data.filter((el)=>{
                return el.completed===false
            })
            setTodo([...newData])
        }else{
            let data=JSON.parse(localStorage.getItem('data'))
            let newData=data.filter((el)=>{
                return el.completed===true
            })
            setTodo([...newData])
        }
    }

    // this effect run after everytime todo updated
    useEffect(()=>{
        setPending(0)
        let data=JSON.parse(localStorage.getItem('data'))
        if(data!==null){
            data.map((el,ind)=>{
                if(!el.completed){
                setPending((x)=>x+ +1)
                }
            })
        }
        
        
    },[todo])

  return (
    <Box mt={5} w={'100%'}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'space-between'}
    padding={5} borderRadius={10} bg={dark ? '#24273d' : 'gray.200'}>
        {/* item lefts for do  */}
    <Text fontWeight={'500'} color={dark ? 'gray' : 'black'}>{pendinttask} Items left</Text>
    
      <Box display={'flex'} gap={2}>
        
      <Text cursor={'pointer'}
      className={active===1 && 'active'} 
      onClick={()=>{filterTask(1)}}
      fontWeight={'500'}  color={dark ? 'gray' : 'black'}>All</Text>

      <Text  cursor={'pointer'} className={active===2 && 'active'}
      onClick={()=>{filterTask(2)}}
      fontWeight={'500'} color={dark ? 'gray' : 'black'}>Active</Text>

      <Text cursor={'pointer'} className={active===3 && 'active'}
      onClick={()=>{filterTask(3)}}
      fontWeight={'500'} color={dark ? 'gray' : 'black'}>Completed</Text>

      </Box>

      {/* clear all completed task button */}
    <Text fontWeight={'500'}
    onClick={()=>{
        clearCompleted()
    }}
      cursor={'pointer'}
      color={dark ? 'gray' : 'black'}>Clear completed</Text>
  </Box>
  )
}
