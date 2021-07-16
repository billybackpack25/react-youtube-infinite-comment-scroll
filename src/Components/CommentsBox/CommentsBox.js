import React from 'react';
import './CommentsBox.css';
import {useOpenReply} from '../Message/Message'
// Main context
import {useMainContext} from '../../Context/Context';


const CommentsBox = (props) => {
    // Access to change the message update
    const {setMessageUpdate} = useMainContext();

    // Importing context to show/hide the reply box
    const changeOpenReply = useOpenReply();
    // Reference to the message
    const message = React.useRef(null);
    // Trigger the underline animation when input clicked rather than page load
    const [showCommentLine, setCommentLine] = React.useState(false);
    // True on focus, False on CANCEL press
    const [showButtons, setShowButtons] = React.useState(false);
    // True on input data, False when input is blank.
    const [disableBtn, setDisableBtn] = React.useState(true);

    // Event handler when the user focuses on the input. 
    // Show underline and button
    // onFocus
    const commentFocus = () => {
        setCommentLine(true);
        setShowButtons(true);
    }

    // When input clicked, hide the underline
    // onBlur
    const commentFocusOut = () => {
        setCommentLine(false);
    }

    // If input value isn't empty, enable commentBtn
    // onKeyUp
    const commentStroke = event => {
        let currMessage = event.target.value;
        // If the user has typed into the unput
        if(currMessage){
            // Show button
            setDisableBtn(false);
        } else {
            // Otherwise hide button
            setDisableBtn(true);
        }
    }

    // Send comment
    const sendComment = (event) => {
        // Prevent page refresh, which is the default behaviour of a button
        // event when it's clicked
        event.preventDefault();
        // TODO: This will add comment to backend
        fetch('/new-sub-comment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messageId: props.useKey, 
                messageData: message.current.value
            })
        }).then(() => {
            setMessageUpdate([1, props.useKey]);
            // Reset everything to that it resets
            message.current.value = '';
            setDisableBtn(false);
        })
    }

    return (
        <form>
            <section className="commentBox">
                <input 
                    autoFocus={props.autoFocus}
                    type="text"
                    placeholder="Add a public comment..."
                    ref={message}
                    onFocus={commentFocus}
                    onBlur={commentFocusOut}
                    onKeyUp={commentStroke}
                />
                {/* Underline begins here */}
                {   // The black div line will only show when the input is clicked
                    // And false when clicking away from input
                    showCommentLine && <div className="commentLine"></div>
                }
            </section>
            {   // Only show when showButtons is true
                showButtons && (
                    <>
                    <button 
                        className="commentButton sendButton" 
                        disabled={disableBtn}
                        onClick={sendComment}
                    >COMMENT</button>
                    <button 
                        className="commentButton" 
                        style={{color: "grey", backgroundColor:"transparent"}}
                        onClick={() => {
                            setShowButtons(false); // Hide button when cancelling
                            changeOpenReply()
                        }}
                    >CANCEL</button>
                    </>
            )}
        </form>
    );
};

export default CommentsBox;