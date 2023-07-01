import logo from './logo.svg';
import './App.css';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src={logo}
          className='App-logo'
          alt='logo'
        />
        <Heading>Let's build Company Queue! 🔥</Heading>
        <Button>Hi</Button>
      </header>
    </div>
  );
}

export default App;
