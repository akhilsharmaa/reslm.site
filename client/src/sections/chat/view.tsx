import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Loader2 } from 'lucide-react'; 
import { createNewSession } from './createNewSession';   
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { sendNewUserChat } from './sendNewUserChat';

export default function ChatInterface() {
 
  const { sessionId } = useParams<{ sessionId: string }>(); // <-- Get sessionId from URL
  const session_id = sessionId ? parseInt(sessionId) : null;  
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);   
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); 

  const handleSubmit = (e:any) => {

    e.preventDefault();
    if (!input.trim()) return;

    if(session_id){
      sendNewUserChat(input, session_id)
    }
    
    // Add user message
    setMessages([
      ...messages,
      { role: 'user', content: input }
    ]);
    setInput(''); 

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'This is a simulated response. In a real application, this would be fetched from an AI API.' }
      ]);
      setIsLoading(false);
    }, 1500);
  }; 

  useEffect(() => {
      const session = async () => { 
          const newSession = await createNewSession();   
          navigate(`/chat/${newSession.data.id}`);
      }
      if(!session_id)session();
  }, [session_id])
  

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! How can I help you today?' }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <button 
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition"
          >
            <Trash2 size={16} />
            Clear chat
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-6 ${message.role === 'user' ? 'ml-auto' : ''}`}
            >
              <div className="flex items-start gap-3">
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    AI
                  </div>
                )}
                <div className={`
                  py-3 px-4 rounded-lg max-w-lg
                  ${message.role === 'user' 
                    ? 'bg-blue-600 text-white ml-auto' 
                    : 'bg-white border border-gray-200'
                  }
                `}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                    U
                  </div>
                )}
              </div>
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
                    <Loader2 className="animate-spin mr-2" size={16} />
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
      <div className="bg-white border-t fixed bottom-0 w-full border-gray-200 p-4">
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
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI Assistant can make mistakes. Verify important information.
          </p> 
        </div> 
    </div> 

    </div>
  );
}