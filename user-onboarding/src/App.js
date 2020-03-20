import React from "react";
import UserForm from "./Components/UserForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;

/* const [noteState, setNoteState] = useState([]);

  const addNewUser = newUser => {
    setNoteState([...noteState, newUser]);
  }; */

/*  <Note users={noteState} /> */
