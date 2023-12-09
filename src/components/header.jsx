import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box,Heading,chakra } from '@chakra-ui/react'
import React from 'react'

export default function Header({dark,setDark}) {
  return (
    <chakra.header display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
    <Heading color={dark ? 'white' :'gray.700'}>TODO</Heading>
   
   {
    dark ?
    <Box p={3} borderRadius={50} _hover={{bg:'gray'}}>
   <SunIcon onClick={()=>{
      setDark(false)
    }}
    cursor={'pointer'} color={'white'} w={8} h={8}/>
   </Box>
    : <Box p={3} borderRadius={50} _hover={{bg:'gray.100'}}>
    <MoonIcon onClick={()=>{
      setDark(true)
    }}
    cursor={'pointer'} color={'gray'} w={8} h={8}/></Box>
   }
  </chakra.header> 
  )
}
