import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => { alert(index) }} mode={'vertical'}>
          <MenuItem index={0}> cool link 0</MenuItem>
          <MenuItem index={1} disabled> cool link 1</MenuItem>
          <MenuItem index={2}> cool link 2</MenuItem>
        </Menu>
        <Button autoFocus onClick={(e) => { e.preventDefault(); alert(123) }} className="custom"> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
        <p> learn react </p>
      </header>
    </div>
  );
}

export default App;
