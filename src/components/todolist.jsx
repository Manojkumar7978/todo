import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Switch, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Edittask } from './edittask'

export default function Todolist({ todo, setTodo, dark, Showtoast }) {

    // function to handel task compled or not 
    const handelCompetion = (id) => {
        let data = JSON.parse(localStorage.getItem('data'))
        let newobj = {
            ...data[id],
            completed: !data[id].completed
        }
        data[id] = newobj
        localStorage.setItem('data', JSON.stringify(data))
        setTodo([...data])
        if (data[id].completed) {
            Showtoast('success', 'Mark as Completed!')
        } else {
            Showtoast('error', 'Mark as Pending!')
        }
    }


    // function to handel delete a task 

    const handelDelete = (id) => {
        let data = JSON.parse(localStorage.getItem('data'))
        data.splice(id, 1)
        localStorage.setItem('data', JSON.stringify(data))
        setTodo([...data])
        Showtoast('success', 'Task deleted successfully!')
    }



    return (
        <Box mt={5} h={'350px'} overflowY={'auto'}
            className={`scroll ${dark ? 'dark' : 'light'}`}
            display={'grid'}
            gap={5}
        >
            {
                todo.map((el, ind) => {
                    return <Box key={el.id}
                        p={5}
                        borderRadius={10}
                        bg={dark ? '#24273d' : 'gray.200'}
                        fontWeight={'500'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        maxH={'70px'}
                    >
                        <Flex alignItems={'center'} gap={3}>
                            <Switch onChange={() => {
                                handelCompetion(ind)
                            }} colorScheme='green'
                                size={'md'}
                                id='isChecked' isChecked={el.completed} />
                            <Text noOfLines={2} fontSize={'14PX'} color={dark ? 'white' : 'black'}>{el.title.toUpperCase()}</Text>
                        </Flex>
                        <Flex gap={3}>
                            <Edittask dark={dark} el={el} ind={ind} setTodo={setTodo} Showtoast={Showtoast}/>
                            <DeleteIcon w={5} h={5} cursor={'pointer'} color={'red.400'}
                                onClick={() => {
                                    handelDelete(ind)
                                }}
                            />
                        </Flex>
                    </Box>
                })
            }

        </Box>
    )
}


{/* <Popover
isOpen={isOpen}
onOpen={onOpen}
onClose={onClose}
placement='right'
closeOnBlur={false}
>
<PopoverTrigger>
 <EditIcon w={5} h={5} cursor={'pointer'} color={dark ? 'white' : 'black'}/>
</PopoverTrigger>
<PopoverContent p={5}>
  <FocusLock returnFocus persistentFocus={false}>
    <PopoverArrow />
    <PopoverCloseButton />
  </FocusLock>
</PopoverContent>
</Popover> */}
