import React, { FC, useContext } from 'react';
import './Bubble.css';

import { MessageContext } from '../context/MessageContext';

const Bubble: FC<{
    colourCounter: number,
    message: string,
}> = ({ colourCounter: colourCounter = 0, message = "" }) => {
    const mutatingMessage = useContext(MessageContext);

    const getBubbleBgStyle = (colourCounter: number) => {
        if (colourCounter % 2 == 1) {
            return "sending"; // checks odds: 1, 3
        } else {
            if (colourCounter == 2) {
                return "receiving-2"; // checks for middle: 2
            } else {
                return "receiving-1" // checks for edges: 0
            }
        }
    }

    const addAnimationDelay = (delay: number): React.CSSProperties => {
        return {
            animationDelay: String((0.125 + delay * 0.2)) + "s"
        }
    };

    const checkIsBubbleLink = (text: string) => {
        // console.dir(text.split("https"));
        const textSplit = text.split(": ");
        if (textSplit.length == 2) {
            const textIntoUrl = "https" + textSplit[1];
            return (
                // <div>
                //     <span className="bubble-text">{}</span>
                //     <br />
                    <a href={textSplit[1]} className="bubble-text">
                        {textSplit[0]}
                    </a>
                // </div>
            )
        } else {
            return (
                <span className="bubble-text">
                {text}
            </span>
            )
        }
    }

    return (
        <MessageContext.Consumer>
            {mutatingMessage =>
                <div className={"bubble-bg" + " " + getBubbleBgStyle(colourCounter % 4)}>
                    {message ? (
                        checkIsBubbleLink(message)
                    ) : (
                        (mutatingMessage == "" ? (
                            React.Children.toArray(['•', '•', '•'].map((text, index) => (
                                <span className="bubble-text dot-jump-up" style={addAnimationDelay(index)}>
                                    {text}
                                </span>
                            )))
                        ) : (
                            checkIsBubbleLink(mutatingMessage)
                        ))
                    )}
                </div>
            }
        </MessageContext.Consumer>
    )
}

export default Bubble;