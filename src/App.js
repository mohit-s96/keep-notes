import './App.css';
import store from './redux/store';
import {setFromLocal} from './redux/actions/actions';
import { Provider } from 'react-redux';
import Navbar from './Components/Navbar';
import NoteContainer from './Components/NoteContainer';
import NoteForm from './Components/NoteForm';
let notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
  store.dispatch(setFromLocal(notes));
}
function App() {
  return (
    <Provider store = {store}>
      <div className="main-wrapper">
        <Navbar/>
        <div className="body-wrapper">
          <NoteForm/>
          <NoteContainer/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
