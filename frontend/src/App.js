// frontend/src/App.js
import './App.css';
import { useEffect, useState } from 'react';
import InputForm from './components/input/InputForm';
import Users from './components/users/Users';

const APIURL = 'http://localhost:3001/api/users';

// Entry point of app
function App() {
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [userTree, setUserTree] = useState({});

  // to add the subordinates in the list
  const handleSubmit = () => {
    fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify({
        id: Number(selectedOption),
        newValue: inputValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTree(data.tree);
        setUsers(data.users);
      });
  };

  // handle Change handler for orodinates
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setUserTree(data.tree);
      });
  }, []);

  return (
    <div className="App">
      <InputForm
        optionList={users}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
      >
        <Users users={userTree} />
      </div>
    </div>
  );
}

export default App;
