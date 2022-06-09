import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import loandingPage from './componentes/loandingPage/loandingPage';
import home from "./componentes/Home/home"
import createVideo from "./componentes/CreateVideo/createVideo"
import detail from './componentes/Detail/detail';








function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <Switch>
       <Route exact path={"/"} component={loandingPage}/>   
       <Route path={"/home"} component={home}/>
       <Route path={"/create"} component={createVideo}/>
       <Route path ={'/videogame/:id'} component = {detail}/>
 
      
      
      
       </Switch> 

    </div>
    </BrowserRouter>
  );
}

export default App;
