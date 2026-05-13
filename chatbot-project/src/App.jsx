import { useState } from 'react'
import './App.css'
import {ChatInput} from './components/ChatInput'
import ChatMessages from './components/ChatMessages'


 function LoginForm(){
            return(
              <>
              
               <div style={{
                display:"flex" , 
               flexDirection:"column" ,
                gap:"10px",
                width:"300px",
                margin : "20px auto"
            }}>
                <input
                 placeholder="Email"
                   style={{width:"100%",padding:"8px"}}/>
                <input type="Password" placeholder="Password"  
                 style={{width:"100%",padding:"8px"}}/>
                
                </div>
              

            <div style={{display:"flex" ,gap:"1px",justifyContent:"center"}}>

            <button> Login</button>
            <button> Sign Up</button>   
            </div>
            </>
            );
           }
           function ProductDetails({name,price}){
            return(
                <div style={{ 
                    width:"200px",
                    display:"flex",
                    flexDirection:"column",
                    gap:"5px",
                    border:"1px solid #ccc",
                    padding:"10px",
                    borderRadius:"8px"
                }}>
                  <p>{name}</p> 
                  <p> Price : ${price}</p>
                  <button>Add to Cart</button>
                </div>
            );
           }
           function EcommerceApp(){
            return(
                <div style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    gap:"15px"

                }}>
                <ProductDetails name="Cotton Socks" price="10.90"/>
                <ProductDetails name="Tennis Balls" price="6.00"/>
                <ProductDetails name="T-shirt" price="15.50"/>
                    </div>
            );
           }
            

        

 function App(){
           
             const [chatMessages,setChatMessages] =useState([
                {
                    message:'Hello Chatbot',
                    sender:'user',
                    id:'id1'
                    },
                    {
                    message:'How can I help you',
                    sender:'robot',
                    id:'id2'
               },
               {
                   message:'can you get me todays date',
                    sender:'user',
                    id:'id3'
                
               },
               {
                 message:'Today is september 27',
                    sender:'robot',
                    id:'id4'
               }
             ]);
             function addMessage (text){
                const newMessage ={
                    message:text,
                    sender:'user',
                    id:crypto.randomUUID()
                };
                const response = chatbot.getResponse(text);

                const botMessage ={
                    message:response,
                    sender:'robot',
                    id:crypto.randomUUID()


                };
                setChatMessages(prev =>[
                    ...prev,
                    newMessage,
                    botMessage

                ]);
             }
            return(
                    <div className="app-container">
                  
                    <ChatMessages chatMessages={chatMessages}/>
                    <ChatInput chatMessages={chatMessages}
                               setChatMessages={setChatMessages}
                               />

                   
                </div>

            );
         }

export default App
