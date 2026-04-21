import {  useRef , useEffect} from 'react'
import {ChatMessage} from './ChatMessage'
import './ChatMessages.css'  

           function ChatMessages({chatMessages}){
            const chatMessagesRef = useRef(null);
            useEffect(()=>{
              const containerElem = chatMessagesRef.current;
              if(containerElem){
                containerElem.scrollTop = containerElem.scrollHeight;
              }
            },[chatMessages]);
              return(
                <div className="chat-messages-container"
                ref={chatMessagesRef}>
                
              {chatMessages.map((msg) => {

                    return(
                        <ChatMessage 
                        message = {msg.message}
                        sender = {msg.sender}
                        key= {msg.id}
                        />
                    );
              })}
              </div>
            );
           }

           export default ChatMessages;

           