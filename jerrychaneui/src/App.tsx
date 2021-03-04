import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={"coffee"} size='10x' />
        <Icon icon="arrow-down" theme="primary" size="10x" />
        <Menu
          defaultIndex="0"
          onSelect={(index) => { alert(index) }}
          // mode={'horizontal'}
          mode={'vertical'}
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
