import React from 'react';

const MainContext = React.createContext();

export function useMainContext() {
    return React.useContext(MainContext);
}

export function ContextProvider(props) {
    // The state that allows us to trigger 
    // either an update or delete request of an individual comment
    const [messageUpdate, setMessageUpdate] = React.useState();

    // Holds the current increment value. Used by the Intersection Observer when fetching new comments
    const [commentIncrement, setCommentIncrement] = React.useState(10);

    // This state boolean will be changed when 
    // posting a new comment to refresh the first 10 message
    const [messageReset, setMessageReset] = React.useState(false);
    const value = {
        messageReset,
        setMessageReset,
        messageUpdate,
        setMessageUpdate,
        commentIncrement,
        setCommentIncrement
    }
    return (
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}