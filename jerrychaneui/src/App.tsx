import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Larget}>Hello</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Baidu</Button>
      </header>
    </div>
  );
}

export default App;
