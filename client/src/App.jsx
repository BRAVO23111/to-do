
import './App.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import TaskList from './component/TaskList'
import TaskForm from './component/TaskForm'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList/>}/>
        <Route path="/task/new" element={<TaskForm/>}/>
        <Route path="/task/edit/:id" element={<TaskForm/>}/>
      </Routes>
    </Router>
  )
}

export default App
