import { EditIcon } from "@chakra-ui/icons";
import { Button, Flex, FocusLock, Input, Popover, PopoverArrow, PopoverCloseButton,
     PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

export const Edittask = ({dark,el,ind,setTodo,Showtoast}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    let[updatedTask,setUpdatedTask]=useState()

    //handel edit submit button
    const handelEditTask=()=>{
        let data=JSON.parse(localStorage.getItem('data'))
        let newObj={
            ...data[ind],
            title:updatedTask
        }
        data[ind]=newObj
        localStorage.setItem('data',JSON.stringify(data))
        setTodo([...data])
        onClose()
        Showtoast('success',"Task edited successfully!")
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement={'bottom'}
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <EditIcon w={5} h={5} cursor={'pointer'} color={dark ? 'white' : 'black'} />
            </PopoverTrigger>
            <PopoverContent p={2} maxW={'100VW'} position={'relative'}>
                {/* for user attention to the tab  */}
                <FocusLock returnFocus> 
                <PopoverArrow/>
                <PopoverCloseButton />
                <Flex mt={5} gap={2}>
                <Input onChange={(e)=>{
                    setUpdatedTask(e.target.value)
                }}  defaultValue={el.title.toUpperCase()}  />
                <Button
                onClick={()=>{
                    handelEditTask()
                }}
                colorScheme="blue"  >Change</Button>
                </Flex>
                </FocusLock>
            </PopoverContent>
        </Popover>
    )
}