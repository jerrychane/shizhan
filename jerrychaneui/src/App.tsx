import React, { useState, useEffect } from 'react';
import axios from 'axios'

// theFileYouDeclaredTheCustomConfigIn.ts
declare module 'axios' {
  export interface AxiosRequestConfig {
    handlerEnabled: boolean;
  }
}

const App: React.FC = () => {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello man'
  }
  useEffect(() => {
    axios.post('http://jsonplaceholder.typicode.com/posts', postData).then(
      resp => {
        console.log('resp', resp)
        setTitle(resp.data.title)
      }
    )
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
      </header>
    </div>
  )
}

export default App;
