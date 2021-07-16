import React from 'react';
import Message from './Components/Message/Message';
// Main context
import {useMainContext} from './Context/Context';

const MessageScroll = (props) => {

    // When bool from main context changes, re-render message list
    const {messageReset, commentIncrement, setCommentIncrement, messageUpdate} = useMainContext();

    // Make sure Increment value in call back function for Intersection Observer is up to date
    const commentIncrementRef = React.useRef(commentIncrement);

    // API - Get the messages 
    const [messages, setMessages] = React.useState([]);

    // Show the bottom bar - loader 
    const [showBottomBar, setShowBottomBar] = React.useState(true);

    // Load up the first 10 comments. 
    // Do this either on application start or when a new comment is posted
    React.useEffect(() => {
        setShowBottomBar(true);
        fetch("/get-data", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({limitNum: 10})
        }).then(res => res.json()).then(comments => {
            setMessages(comments);
        })
    }, [messageReset]);

    // Either update or delete an individual comment
    React.useEffect(() => {
        if(messageUpdate){
            // If message update [0] is 1 then that means we update, else we delete comment
            if(messageUpdate[0] ===  1){
                fetch('/update-comment', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({commentId: messageUpdate[1]})
                })
                .then(res => res.json())
                .then(commentData => {
                    updateComment(commentData);
                })
            } else if (messageUpdate[0] ===  2){
                deleteComment();
            }
        }
    }, [messageUpdate])

    function deleteComment() {
        let currentMessage = [...messages];
        let currentMessageIndex = currentMessage.findIndex(message => message._id === messageUpdate[1]);
        currentMessage.splice(currentMessageIndex, 1);
        setMessages(currentMessage);
    }

    function updateComment(commentData) {
        let currentMessage = [...messages];
        if(commentData) {
            // Get index matching comment
            let currentMessageIndex = currentMessage.findIndex(message => message._id === commentData._id)
            currentMessage.splice(currentMessageIndex, 1, commentData);
            setMessages(currentMessage);
        }
    }

    // Intersection observer
    const observer = React.useRef(new IntersectionObserver(entries => {
        const first = entries[0];
        if(first.isIntersecting){
            fetch('/get-more-data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({commentIncrement: commentIncrementRef.current})
            }).then(res => res.json()).then(comments => {
                if(comments.length > 0){
                    setTimeout(() => {
                        setMessages(prev => [...prev, ...comments]);
                    }, 500)   
                } else {
                    setTimeout(() => {
                        setShowBottomBar(false);
                    }, 500) 
                }
                // We are comments.length just incase there aren't 10 comments left
                setCommentIncrement(prev => prev += comments.length);
            })
        }
    }), {threshold: 1})

    // Ensure Comment Increment is up to date
    React.useEffect (() => {
        commentIncrementRef.current = commentIncrement;
    }, [commentIncrement]);

    // bottomBar will contain the bottom JSX element
    const [bottomBar, setBottomBar] = React.useState(null);

    React.useEffect(() => {
        const currentBottomBar = bottomBar;
        const currentObserver = observer.current;
        if(currentBottomBar) {
            currentObserver.observe(currentBottomBar);
        }

        return () => {
            if(currentBottomBar){
                currentObserver.unobserve(currentBottomBar);
            }
        }
    }, [bottomBar])


    return (
        <>
            {/** Show a single message 
            <Message 
                user="Dummy User"
                editable={false} // If not the owner, cannot delete
                message="Dummy Message"
                likes={25}
            />*/}
            {/** Show messages dynamically */
                messages.map(message => (
                    <Message 
                        key={message._id} // cannot use this in child
                        useKey={message._id} // But we can use this
                        user={message.user}
                        editable={message.editable}
                        message={message.message}
                        likes={message.likes}
                        replies={message.replies}
                    />
                ))
            }
            {/** This will act as the loader */}
            {
                // Don't need if there is less than 9 messages
                // show bottom bar needs to be true as well
                messages.length > 9 && showBottomBar ? (
                <div className="bottomBar" ref={setBottomBar}><div className="loader"></div></div> 
                ) : null
            }

        </>
    );
};

export default MessageScroll;