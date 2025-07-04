import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react'; 
import { createNewSession } from './createNewSession';   
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { sendNewUserChat } from './sendNewUserChat';
import Chat, {ChatType} from '../../models/Chat';
import { getSseUrl } from './getSseUrl';
import { CONFIG } from '../../config-global';
import { fetchCompleteChat } from './fetchCompleteChat'; 
import ChatSkeleton from '../../components/ChatSkeleton';
import StartMessage from '../../components/StartMessage';
import CollapsibleChunk from '../../components/Chunk'; 

export default function ChatInterface() {
 
  const { sessionId } = useParams<{ sessionId: string }>(); // <-- Get sessionId from URL
  const session_id = sessionId ? parseInt(sessionId) : null;  
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Chat[]>([]);   
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messagesLoading, setMessageLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); 

  const handleSubmit = async (e:any) => {

      e.preventDefault();
      if (!input.trim() || !session_id) return; 

      setIsLoading(true);
      const response = await sendNewUserChat(input, session_id) 
      
      if (response.status === 200) {   
        setMessages([...messages, response.data]);
      } 

      const sseToken = await getSseUrl(session_id); 
      
      // Initialize the EventSource, listening for server updates
      const eventSource = new EventSource(`${CONFIG.baseUrl}/chat/stream?token=${sseToken.data}`);

      // Listen for messages from the server
      eventSource.onmessage = function(event) {
        setMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
        
          if (!lastMessage || lastMessage.type !== ChatType.AI) {
            return [
              ...prevMessages,
              {
                id: 0,
                type: ChatType.AI,
                text: event.data,
                session_id: 0,
                chunks: [],
                created_at: new Date(),
              },
            ];
          }
        
          return [
            ...prevMessages.slice(0, -1),
            {
              ...lastMessage,
              text: lastMessage.text + event.data,
            },
          ];
        }); 
      };

      // Log connection error
      eventSource.onerror = function(event) {
        console.error('Error occurred:', event);
        setIsLoading(false);
      }; 
    
    // setIsLoading(true);
    // setTimeout(() => {
    //   setMessages(prevMessages => [
    //     ...prevMessages,
    //     { role: 'assistant', content: 'This is a simulated response. In a real application, this would be fetched from an AI API.' }
    //   ]);
    //   setIsLoading(false);
    // }, 1500); 
  }; 

  useEffect(() => {
      const handleStart = async () => { 
          if(session_id){
            const response = await fetchCompleteChat(session_id); 
            const chats: Chat[] = response.data;  
            setMessages(chats);
          }else {
            const newSession = await createNewSession();   
            navigate(`/chat/${newSession.data.id}`);
          } 
          setMessageLoading(false); 
      }
      handleStart(); 
  }, []) 

  return (
    <div className="flex flex-col h-screen bg-white"> 


      {/* Chat messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-5xl mx-auto">

          {!messagesLoading && messages.length === 0 && <StartMessage/>}            
          {messagesLoading && <ChatSkeleton/>}

          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-6 ${message.type === ChatType.HUMAN ? 'ml-auto' : ''}`}
            >
              <div className="flex items-start gap-3">
                {message.type === ChatType.AI && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    AI
                  </div>
                )}
                <div className={`
                  py-3 px-4 rounded-lg max-w-lg
                  ${message.type === ChatType.HUMAN 
                    ? 'bg-blue-600 text-white ml-auto' 
                    : 'bg-gray-200 border border-gray-200'
                  }
                `}>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.type === ChatType.HUMAN  && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                    U
                  </div>
                )}

              </div>
              
              <div className='flex flex-wrap justify-end m-2'>
                {message.chunks.map((chunk, index) => {
                      return <CollapsibleChunk
                                key={index} 
                                text={chunk.text} 
                                title={`chunk-${index}`} />
                  })}
              </div>
              <br />
            </div>
          ))}
          {isLoading && (
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                  AI
                </div>
                <div className="py-3 px-4 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center"> 
                    <span className="text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
        

      {/* Input area */}
      <div className="bg-white border-t bottom-0 w-full border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message the AI assistant..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-lg ${
                input.trim() && !isLoading 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              <Send size={20} />
            </button>
          </form> 
        </div> 
    </div> 

    </div>
  );
}