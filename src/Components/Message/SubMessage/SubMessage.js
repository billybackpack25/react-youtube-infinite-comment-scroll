import React from 'react';
import SubCommentsBox from '../../CommentsBox/SubCommentsBox/SubCommentsBox';
// Main Context
import {useMainContext} from '../../../Context/Context';

// Give children access to openReply,
// So that the REPLY comments box knows when to appear
const showReply = React.createContext();
export function useOpenReply() {
    return React.useContext(showReply);
}

// Show a single message section
const SubMessage = (props) => {

    // Get the setMessageUpdate method 
    const {setMessageUpdate} = useMainContext();

    // Change color of thumbs up icon
    const likeIcon = React.useRef();

    // Show number of likes
    const numLikes = React.useRef();

    // 
    const [openReply, setOpenReply] = React.useState(false);

    // Event handlers

    // Toggled when CANCEL button and REPLY are pressed
    const changeOpenReply = () => {
        setOpenReply(prev => prev = !prev);
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
        fetch('/update-sub-like', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({messageId: props.parentKey, subId: props.subId, likes: likes})
        })
    }

    // Delete message
    const deleteMessage = () => {
        fetch('/delete-sub-comment', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({messageId: props.parentKey, subId: props.subId})
        })
        .then(() => {
            setMessageUpdate([1, props.parentKey]);
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
                        props.user !== 'Super User' ? (
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
                    openReply && <SubCommentsBox
                        autoFocus={true}
                        parentKey={props.parentKey}
                     />
                    
                }
                </showReply.Provider>

            </section>
        </>
    );
};

export default SubMessage;