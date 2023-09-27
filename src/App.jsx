import 'bootstrap/dist/css/bootstrap.min.css';
import Pages from '../src/Pages/Pages'
import Category from "./components/category";
import {BrowserRouter } from 'react-router-dom'
import Search from './components/Search';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Search />
        <Category/>
        <Pages />
      </BrowserRouter>
    </div>
  )
}

export default App
