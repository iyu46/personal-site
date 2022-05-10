import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import { MessageContext } from './context/MessageContext';
import Bubble from './components/Bubble';

const App = () => {
    const [ currentMessage, setCurrentMessage ] = useState<string>('');
    const [ messageLog, setMessageLog ] = useState<string[]>(["hello!", "hi!", "how are you?", "good, thanks!"]);
    const [ isChatboxMoving, setIsChatboxMoving ] = useState<boolean>(false);
    const [ isMessageIncoming, setIsMessageIncoming ] = useState<boolean>(false);
    const [ isClearingLog, setIsClearingLog ] = useState<boolean>(false);
    let colourCounter = 0;

    const createBubble = (contents: string, index: number, fadeIn?: boolean) => {
        const bubbleChatboxClass = ["chat-receiving", "chat-sending"];
        let bubbleClassName = '';

        if (fadeIn) {
            bubbleClassName = "chat-receiving chatbox-move-up chatbox-fade-in-move-up";
        } else {
            bubbleClassName = bubbleChatboxClass[index % 2];
        }

        return (
            <div className={bubbleClassName}>
                {fadeIn ? (<div className={"wait-for-dots-animation"} onAnimationEnd={() => handleMovingAnimationEnd()}/>) : null}
                <Bubble
                    colourCounter={index}
                    message={contents ? contents : ""}
                />
            </div>
        );
    };

    const handleSubmitInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setMessageLog([...messageLog, event.currentTarget.value])
            event.currentTarget.value = '';
        }
    }

    const replaceLastMessageInMessageLog = (newMessage: string) => {
        const newLog = messageLog;
        newLog[messageLog.length - 1] = newMessage;
        setMessageLog([... newLog])
    }


    const handleReplaceLast = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            replaceLastMessageInMessageLog(event.currentTarget.value);
            event.currentTarget.value = '';
        }
    }

    const handleMovingAnimationEnd = () => {
        colourCounter = 0;
        setCurrentMessage("that's good to hear!");
        setMessageLog([...messageLog, "that's good to hear!"])
        setIsChatboxMoving(false);
        setIsMessageIncoming(false);
    }

    return (
        <MessageContext.Provider value={currentMessage}>
            <div className="App">
                <div className="chatbox">
                    <div
                        className={"chatbox-contents" + (isClearingLog ? " chatbox-clear" : (isChatboxMoving ? " chatbox-move-up" : ""))}
                        onAnimationStart={() => setIsMessageIncoming(true)}
                    >
                        {React.Children.toArray(messageLog.map((message) => {
                            colourCounter += 1;
                            return createBubble(message, colourCounter - 1)}))}
                        {(isMessageIncoming) ?
                        (
                            createBubble(currentMessage, colourCounter++, true)
                        ) : null}
                    </div>
                    {"add"}<input type="text" onKeyDown={handleSubmitInput} />
                    {"replaceLast"}<input type="text" onKeyDown={handleReplaceLast} />
                    <img src={logo} className="App-logo" alt="logo" onClick={() => setIsChatboxMoving(!isChatboxMoving)}/>
                </div>
            </div>
        </MessageContext.Provider>
    );
}

export default App;
