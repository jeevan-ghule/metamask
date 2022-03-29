import logo from './logo.svg';
import './App.css';
import ToDo from './components/Todo';
import AddressLabel from './components/AddressLabel';


import { initializeParse } from '@parse/react';

initializeParse(
  'http://localhost:1337/parse',
  'myAppId',
  'YOUR_JAVASCRIPT_KEY'
);

function App() {
  return (
    <div>
      <h1>METAMASK</h1>
      <AddressLabel></AddressLabel>
      <ToDo></ToDo>

    </div>
  );
}

export default App;
