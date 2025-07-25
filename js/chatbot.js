import { chatbotKnowledgeBase } from './data.js';


const API_KEY = 'YOUR_API_KEY_HERE';
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

let messages = [];

export function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');

    if (!chatbotToggle || !chatbotClose || !chatbotWindow || !chatbotForm) return;

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.style.transform = 'scale(1)';
        chatbotWindow.style.opacity = '1';
        if (messages.length === 0) {
            addMessage('ai', "Hello! How can I help you with TLT Enterprise today?");
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.transform = 'scale(0.5)';
        chatbotWindow.style.opacity = '0';
        setTimeout(() => chatbotWindow.classList.add('hidden'), 300);
    });

    chatbotForm.addEventListener('submit', handleUserMessage);

    messages.push({
        role: "system",
        content: chatbotKnowledgeBase
    });
}

async function handleUserMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chatbot-input');
    const userText = input.value.trim();
    if (!userText) return;

    addMessage('user', userText);
    messages.push({ role: 'user', content: userText });
    input.value = '';
    
    showTypingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        removeTypingIndicator();
        addMessage('ai', aiText);
        messages.push({ role: 'assistant', content: aiText });
    } catch (error) {
        console.error("Chatbot API error:", error);
        removeTypingIndicator();
        addMessage('ai', "Sorry, I'm having trouble connecting right now. Please try again later.");
    }
}

function addMessage(sender, text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.classList.add('message', 'ai-message', 'typing-indicator');
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
