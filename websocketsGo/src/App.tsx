import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import * as WebSocket from "websocket"

function App() {
  useEffect(() => {
    console.log("in it")
    const socket = new WebSocket.w3cwebsocket('ws://localhost:8080/ws');
 
    socket.onopen = function () {
      socket.send("helloheee!")
      socket.onmessage = (msg: any) => {
        console.log(msg);
        console.log("we got msg..")
      };
    };
  }, []);
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
