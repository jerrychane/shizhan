import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button disabled btnType={ButtonType.Primary} size={ButtonSize.Larget}>Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Larget}>Larget Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">Baidu Link</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Disabled Link</Button>

      </header>
    </div>
  );
}

export default App;
