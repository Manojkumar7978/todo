import { Box, Skeleton,Stack } from '@chakra-ui/react'
import React from 'react'

export default function Skeliton() {
  return (
  <>
      <Stack>
    <Skeleton height='10px' />
    <Skeleton height='10px' />
    <Skeleton height='10px' />
  </Stack>
  <Stack>
    <Skeleton height='10px' />
    <Skeleton height='10px' />
    <Skeleton height='10px' />
  </Stack>
  <Stack>
    <Skeleton height='10px' />
    <Skeleton height='10px' />
    <Skeleton height='10px' />
  </Stack>
  <Stack>
    <Skeleton height='10px' />
    <Skeleton height='10px' />
    <Skeleton height='10px' />
  </Stack>
  </>
  )
}
