import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App: React.FC = () => {
  return (
    <div className="App" style={{ marginTop: '100px', marginLeft: '100px' }}>
      <form method="post" encType="multipart/form-data" action="http://jsonplaceholder.typicode.com/posts">
        <input type="file" name="myFile" />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default App;
