import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Bot, Play, RefreshCw, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const TOPICS = ["Java", "Python", "React.js", "JavaScript", "Data Structures", "Behavioral (HR)", "SQL", "Node.js"];

const AiMockInterviewer = () => {
    const [topic, setTopic] = useState(TOPICS[0]);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]); // Stores chat history
    const [input, setInput] = useState('');
    
    // To track current question for API
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const startInterview = async () => {
        setStarted(true);
        setLoading(true);
        setMessages([{ role: 'system', text: `Starting interview on ${topic}...` }]);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://127.0.0.1:5000/api/ai-interview/chat', 
                { topic, currentQuestion: null }, 
                { headers: { 'x-auth-token': token } }
            );

            const aiData = res.data;
            setMessages(prev => [...prev, { role: 'ai', text: aiData.nextQuestion }]);
            setCurrentQuestion(aiData.nextQuestion);
        } catch (err) {
            toast.error("Failed to start interview");
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if(!input.trim()) return;

        const userAns = input;
        setInput(''); // Clear input
        setMessages(prev => [...prev, { role: 'user', text: userAns }]); // Add user msg immediately
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://127.0.0.1:5000/api/ai-interview/chat', 
                { topic, currentQuestion: currentQuestion, userAnswer: userAns }, 
                { headers: { 'x-auth-token': token } }
            );

            const aiData = res.data;

            // Show Feedback first
            const feedbackMsg = `Example Feedback (Score: ${aiData.rating}/10): ${aiData.feedback}`;
            
            // Then Ask Next Question
            setMessages(prev => [
                ...prev, 
                { role: 'feedback', text: feedbackMsg, rating: aiData.rating },
                { role: 'ai', text: aiData.nextQuestion }
            ]);
            
            setCurrentQuestion(aiData.nextQuestion);

        } catch (err) {
            toast.error("AI failed to respond");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>AI Mock Interviewer</h1>
                    <p style={styles.subtitle}>Practice technical questions with real-time feedback.</p>
                </div>
                {!started && (
                    <div style={{display:'flex', gap:'10px'}}>
                        <select style={styles.select} value={topic} onChange={e => setTopic(e.target.value)}>
                            {TOPICS.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <button onClick={startInterview} style={styles.startBtn}>
                            <Play size={18} fill="white"/> Start
                        </button>
                    </div>
                )}
                {started && (
                    <button onClick={() => window.location.reload()} style={styles.restartBtn}>
                        <RefreshCw size={16}/> New Interview
                    </button>
                )}
            </div>

            {/* Chat Area */}
            <div style={styles.chatBox}>
                {!started && (
                    <div style={styles.placeholder}>
                        <Bot size={60} color="#cbd5e1"/>
                        <h3>Select a topic and click start!</h3>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        ...styles.msgRow, 
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        {/* Avatar */}
                        {msg.role !== 'user' && msg.role !== 'system' && (
                             <div style={{...styles.avatar, background: msg.role === 'feedback' ? '#f59e0b' : '#4f46e5'}}>
                                 {msg.role === 'feedback' ? <Star size={14} color="white"/> : <Bot size={18} color="white"/>}
                             </div>
                        )}

                        {/* Bubble */}
                        <div style={{
                            ...styles.bubble,
                            background: msg.role === 'user' ? '#4f46e5' : msg.role === 'feedback' ? '#fffbeb' : '#f1f5f9',
                            color: msg.role === 'user' ? 'white' : msg.role === 'feedback' ? '#b45309' : '#1e293b',
                            border: msg.role === 'feedback' ? '1px solid #fcd34d' : 'none',
                            maxWidth: msg.role === 'feedback' ? '80%' : '60%'
                        }}>
                            {msg.role === 'system' ? <i>{msg.text}</i> : msg.text}
                        </div>
                    </div>
                ))}
                
                {loading && <div style={{padding:'20px', color:'#64748b'}}>AI is typing...</div>}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {started && (
                <form onSubmit={handleSend} style={styles.inputArea}>
                    <input 
                        style={styles.input} 
                        placeholder="Type your answer here..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" style={styles.sendBtn} disabled={loading}>
                        <Send size={20}/>
                    </button>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '20px', height:'85vh', display:'flex', flexDirection:'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin:0 },
    subtitle: { color: '#64748b' },
    
    select: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' },
    startBtn: { background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
    restartBtn: { background: 'white', border: '1px solid #cbd5e1', color: '#475569', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'5px' },

    chatBox: { flex: 1, background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflowY: 'auto', padding: '20px', display:'flex', flexDirection:'column', gap:'15px' },
    placeholder: { height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#94a3b8' },

    msgRow: { display: 'flex', alignItems: 'flex-start', gap: '10px' },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    bubble: { padding: '12px 18px', borderRadius: '12px', fontSize: '0.95rem', lineHeight: '1.5' },

    inputArea: { marginTop: '20px', display: 'flex', gap: '10px' },
    input: { flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' },
    sendBtn: { background: '#0f172a', color: 'white', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer' }
};

export default AiMockInterviewer;