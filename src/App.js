import logo from './logo.svg';
import './App.css';
import { BasicTable } from './components/BasicTable';
import { SortingTable } from './components/SortingTable';
import SimpleTabs from './components/TabComponent';

function App() {
  return (
    <div className="App">
      {/* <BasicTable></BasicTable> */}
      {/* <SortingTable></SortingTable> */}
      <SimpleTabs></SimpleTabs>
    </div>
  );
}

export default App;
