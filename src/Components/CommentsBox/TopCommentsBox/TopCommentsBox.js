import React from 'react';
import '../CommentsBox.css';
// Main context
import {useMainContext} from '../../../Context/Context';

const TopCommentsBox = (props) => {
    // Get message reset function from main context
    const {setMessageReset, setCommentIncrement} = useMainContext();

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
        fetch('/new-comment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // Send the value of the message we created
                messageData: message.current.value
            })}).then(() => {
                // Reset entire comments and matching increment counter
                setMessageReset(prevState => !prevState);
                setCommentIncrement(10);
                // Delete text input, update comments and disable comment btn
                message.current.value = '';
                setDisableBtn(true);
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
                            message.current.value="" // Clear comment when clicking on the cancel button
                        }}
                    >CANCEL</button>
                    </>
            )}
        </form>
    );
};

export default TopCommentsBox;