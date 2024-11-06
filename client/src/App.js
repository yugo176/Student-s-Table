import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './pages/Create';
import Read from './pages/Read';
import Edit from './pages/Edit';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/create' exact Component={Create} />
        <Route path='/read/:id' exact Component={Read} />
        <Route path='/edit/:id' exact Component={Edit} />
        <Route path='*' exact Component={Notfound} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
