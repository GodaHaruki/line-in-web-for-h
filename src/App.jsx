import { useState, createContext } from 'react';
import './App.css';
import SignIn from './components/signin';
import { useUserInfoContext } from './components/userInfo.jsx';
import Chat from './pages/Chat.jsx';

function App() {
  const { userInfo } = useUserInfoContext();
  console.log(`isLogin : ${JSON.stringify(userInfo.current.isLogin)}`);
  return (
    <div className="App">
      <SignIn className=`${userInfo.current.isLogin ? "hidden" : "visible"}` />
      <Chat className=`${userInfo.current.isLogin ? "visible" : "hidden"} />
    </div>
  );
}

export default App;
