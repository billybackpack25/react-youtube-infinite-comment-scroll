import React from 'react';
import './Message.css';
import CommentsBox from '../CommentsBox/CommentsBox';
import SubMessage from './SubMessage/SubMessage';
// Main Context
import {useMainContext} from '../../Context/Context';

// Give children access to openReply,
// So that the REPLY comments box knows when to appear
const showReply = React.createContext();
export function useOpenReply() {
    return React.useContext(showReply);
}

// Show a single message section
const Message = (props) => {
    // Get access to the setMessageUpdate
    const {setMessageUpdate} = useMainContext();

    // Change color of thumbs up icon
    const likeIcon = React.useRef();

    // Show number of likes
    const numLikes = React.useRef();

    // Arrow to expand replies
    const [arrowUp, setArrowUp] = React.useState(false);

    // 
    const [openReply, setOpenReply] = React.useState(false);

    // Event handlers

    // Toggled when CANCEL button and REPLY are pressed
    const changeOpenReply = () => {
        setOpenReply(prev => prev = !prev);
    }

    // Toggle arrow up and down when the view replies is clicked
    let arrow = <i className="fas fa-caret-down"></i>;

    const changeArrow = () => {
        setArrowUp(prev => prev = !prev);
    }

    if(arrowUp){
        arrow = <i className="fas fa-caret-up"></i>;
    } else {
        arrow = <i className="fas fa-caret-down"></i>;
    }

    // Like comment
    let toggleLike = false;
    let likes = props.likes;
    const likeComment = () => {
        toggleLike = !toggleLike;
        if(toggleLike){
            likes++;
            likeIcon.current.style.color = "#4688de";
        } else {
            likes--;
            likeIcon.current.style.color = "grey";
        }
        // Change the number of likes on the HTML page
        // To the same as likes prop
        numLikes.current.innerHTML = likes;

        // Store this new value in the data base
        fetch('/update-like', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({messageId: props.useKey, likes: likes})
        })
    }

    

    // Delete message
    const deleteMessage = () => {
        console.log(`useKey: ${props.useKey}`);
        fetch('/delete-comment',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({messageId: props.useKey})
        })
        .then(() => {
            setMessageUpdate([2, props.useKey]);
        })
    }


    return (
        <>
            <section className="messageContainer">
                {
                    // The user
                }
                <div className="messageUser">{props.user}</div>
                <i className="fas fa-user-circle"></i>
                {
                    // The message
                }
                <div className="messageText">{props.message}</div>
                {
                    // Icons
                    // likes
                    // REPLY / DELETE
                }
                <section className="messageIconsContainer">
                    <i 
                        className="fas fa-thumbs-up" 
                        ref={likeIcon}
                        onClick={likeComment}
                    ></i>
                    <div
                        ref={numLikes}
                    >{props.likes}</div>
                    <i className="fas fa-thumbs-down"></i>
                    {
                        !props.editable ? (
                            <div
                                onClick={changeOpenReply}
                            >REPLY</div>
                        ) : (
                            <div
                                onClick={deleteMessage}
                            >DELETE</div>
                        )
                    }
                </section>
                {
                    // Replies Section
                }
                <showReply.Provider value={changeOpenReply}>
                {
                    openReply && <CommentsBox
                        useKey={props.useKey}
                        autoFocus={true}
                     />
                    
                }
                </showReply.Provider>
                {   /** Only render if there are any replies */
                    props.replies.length > 0 && (
                        <section 
                            className="arrowReplies"
                            onClick={changeArrow}
                        >
                            {arrow}
                            <div>View {props.replies.length} replies</div>

                        </section>
                    )
                }
                { /** Display the reply messages */}
                {
                    arrowUp && (
                    <section className="subMessages">
                    
                    {
                        props.replies.map(reply => (
                            <SubMessage 
                                key={Math.random()}
                                parentKey={props.useKey}
                                subId={reply._id} // Need this for a fetch request to delete a sub comment
                                user={reply.user}
                                message={reply.message}
                                likes={reply.likes}
                            />
                        ))
                    }

                    { 
                        /** Show single reply 
                        <SubMessage 
                            user="Dummy Reply 2" 
                            message="This is a dummy reply" 
                            likes={2} 
                        />*/ 
                    }

                    </section>
                    )
                }
                
            </section>
        </>
    );
};

export default Message;