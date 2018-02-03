import React from 'react'
import { ClipLoader } from 'react-spinners'
import { Center } from './styles'

const Loader = () => (
  <Center>
    <ClipLoader
      id='loader'
      color='purple'
      loading
      size={40}
    />
  </Center>
)

export default Loader
