import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import {Home} from './components/pages/Home'
import {InAndOut} from './components/pages/InAndOut'
import { History } from './components/pages/History'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/in-and-out" element={<InAndOut />} />
      <Route path="/history" element={<History />} />

    </Routes>
  )
}

export default App
