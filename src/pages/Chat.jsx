import { useEffect, useRef, useState } from "react";
// import ReactMarkdown from 'react-markdown';
import { useUserInfoContext } from "../components/userInfo.jsx";

const MyBalloon = ({ children }) => {
  return (
    <div className="my-chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {/* <ReactMarkdown children={text} /> */}
              {children}
            </span>
          </div>
          {/* <span class="text-xs text-gray-500 leading-none">2 min ago</span> */}
        </div>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        />
      </div>
    </div>
  );
};

const OtherBalloon = (props) => {
  return (
    <div className="other-chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <span className="text-xs text-gray-300 inline-block leading-none">
            {props.name}
          </span>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
              {props.children}
            </span>
          </div>
        </div>
        <img
          src="https://static.wikia.nocookie.net/virtualyoutuber/images/4/4b/Nekomata_Okayu_Portrait.png"
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};

const Chat = (props) => {
  const [messages, setMessage] = useState([]);
  const inputRef = useRef();
  const { userInfo } = useUserInfoContext();
  const isFetching = useRef(false);
  const DBURL =
    "https://script.google.com/macros/s/AKfycbyIVW3va5PXG9i6RG8CJAsetr1pJGqbnLnjOdFFV76VZfjQQ5VT6aYpFVuVi9Bhb_mNzg/exec";

  // const userType = useRef("bot")
  const groupType = useRef("test");
  const organization = "C2142f9bef0db3567f02ab80cf6bca262";

  useEffect(() => {
    console.log("reRendered");
  });

  const getChat = () => {
    if (!isFetching.current) {
      isFetching.current = true;
      fetch(`${DBURL}?route=api/get/${organization}`)
        .then((response) => response.json())
        .then((json) => {
          json = JSON.parse(JSON.stringify(json));
          console.log(json);
          console.log(messages);
          setMessage(
            json.map((e, i) => {
              // const isMine = userInfo.current.userID == ;
              const isMine = e.userID == "BOT";
              return isMine ? (
                <MyBalloon
                  key={`MyBaloon: ${i}`}
                  children={e.messageType == "text" ? e.userMessage : "sticker"}
                />
              ) : (
                <OtherBalloon
                  key={`OtherBalloon: ${i}`}
                  name={e.userName}
                  children={e.messageType == "text" ? e.userMessage : "sticker"}
                />
              );
            })
          );
          isFetching.current = false;
        });
    }
  };

  useEffect(() => {
    const poling = setInterval(() => getChat(), 3000); // props.interval : useRef()
    return () => clearInterval(poling);
  }, []);

  const handleClick = () => {
    console.log(`Message: ${inputRef.current.value}`);
    setMessage([...messages, <MyBalloon children={inputRef.current.value} />]);
    isFetching.current = true;
    console.log(
      `url: ${DBURL}?route=api/post/${groupType.current}/${organization}/${userInfo.current.displayName}/text/${inputRef.current.value}`
    );
    fetch(
      `${DBURL}?route=api/post/${groupType.current}/${organization}/${userInfo.current.displayName}/text/${inputRef.current.value}`
    )
      .then(() => console.log("posted"))
      .catch((e) => console.log("an error occured\n" + e));

    inputRef.current.value = "";
  };

  return (
    <div className="w-screen h-screen flex-1 p:2 sm:p-6 justify-between flex flex-col">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          {/* <div className="relative">
            <span className="absolute tshiext-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div> */}
          <div className="flex flex-col leading-tight mx-2">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-200 mr-3">あゆむ用</span>
            </div>
            {/* <span className="text-lg text-gray-400">
              Chat data may be lost or suddenly unavailable due to maintenance
            </span> */}
          </div>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow"
      >
        {messages}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            {/* <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span> */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:lder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-lg py-3"
            />
            <div className="absolute right-0 items-center sm:flex">
              <button
                className="btn btn-primary px-4 py-1 rouded-md"
                onClick={handleClick}
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
