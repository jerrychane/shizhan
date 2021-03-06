import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transiton/transition'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  const a = '123'
  if (a === '123') {

  }
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={"coffee"} size='10x' />
        <Icon icon="arrow-down" theme="primary" size="10x" />
        <Menu
          defaultIndex="0"
          onSelect={(index) => { alert(index) }}
          mode={'horizontal'}
          // mode={'vertical'}
          defaultOpenSubMenus={['2']}
        >
          <MenuItem > cool link 0</MenuItem>
          <MenuItem disabled> cool link 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem > cool link 2</MenuItem>
        </Menu>
        <Button size="sm" onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p> Edit <code>src/App.tsx</code> and save to reload.</p>
            <p> Edit <code>src/App.tsx</code> and save to reload.</p>
            <p> Edit <code>src/App.tsx</code> and save to reload.</p>
            <p> Edit <code>src/App.tsx</code> and save to reload.</p>
            <p> Edit <code>src/App.tsx</code> and save to reload.</p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
          <Button btnType="primary" size='lg'>A Large Button</Button>
        </Transition>
        <p> learn react </p>
      </header>
    </div>
  );
}

export default App;
