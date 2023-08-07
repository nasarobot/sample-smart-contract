import './App.css';
import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import abi from './abi.json';
function App() {
  const addr = "0x540Fe984a02CA999f8AE74621d6e3980ECB9F748";
  const [contract, setContract] = useState();
  const [todoCount, setTodoCount] = useState(0);

  const contractExecution = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract(addr, abi, signer);
    setContract(Contract);
    // const getString = await Contract.todoList()
  }

  const getTodoCount = async() => {
    if(contract){
      const res = await contract.count();
      setTodoCount(Number(res));
    }
  }
  
  useEffect(() => {
    contractExecution();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Count:- {todoCount}</h1>
        <button onClick={getTodoCount}>Get Count</button>
        <p>Address: {addr}</p>
      </header>
    </div>
  );
}

export default App;
