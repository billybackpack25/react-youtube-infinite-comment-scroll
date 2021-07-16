import './App.css';
import TopCommentsBox from './Components/CommentsBox/TopCommentsBox/TopCommentsBox';
import MessageScroll from './MessageScroll';
// Main context
import {ContextProvider} from './Context/Context';

function App() {
  return (
    <ContextProvider>
      <div className="ColHolder">
        {
          // Comment box autoFocus false so that on page load it 
          // doesn't go straight there 
        }
        <TopCommentsBox autoFocus={false} />
        {
          // Render all elemtns below the Top Comments Box
          // Handle infinate scrolling logic
        }
        <MessageScroll />
      </div>
    </ContextProvider>
  );
}

export default App;
