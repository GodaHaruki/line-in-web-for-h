import { useState, createContext } from "react";
import "./App.css";
import SignIn from "./components/signin";
import { useUserInfoContext } from "./components/userInfo.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  const { userInfo } = useUserInfoContext();
  console.log(`isLogin : ${JSON.stringify(userInfo.current.isLogin)}`);
  console.log(
    `visibility \nSignIn: ${
      userInfo.current.isLogin ? "hidden" : "visible"
    }\nChat: ${userInfo.current.isLogin ? "visible" : "hidden"}`
  );
  return (
    <div className="App">
      <div
        className={`signin ${
          userInfo.current.isLogin ? "hidden" : "visible w-screen h-screen"
        }`}
      >
        <SignIn />
      </div>
      <div
        className={`chat ${
          userInfo.current.isLogin ? "visible w-screen h-screen" : "hidden"
        }`}
      >
        <Chat />
      </div>
    </div>
  );
}

export default App;
