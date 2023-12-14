document.addEventListener('DOMContentLoaded', function () {
    // Load the JSON file with responses
    fetch('responses.json')
        .then(response => response.json())
        .then(data => {
            // Store responses in a variable
            window.intents = data.intents;
        })
        .catch(error => console.error('Error loading responses:', error));
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Get user input
    const userMessage = userInput.value.trim();

    // Clear user input
    userInput.value = '';

    // Display user message in the chat box
    appendMessage('user', userMessage);

    // Get response from the banking chatbot
    const botResponse = getBotResponse(userMessage);

    // Display bot response in the chat box after a short delay
    setTimeout(() => {
        appendMessage('bot', botResponse);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
    // Use the predefined responses from the JSON file
    const intents = window.intents;
    const lowercaseUserMessage = userMessage.toLowerCase();

    // Check if the user's message matches any predefined intent
    for (const intent of intents) {
        for (const pattern of intent.patterns) {
            if (lowercaseUserMessage.includes(pattern.toLowerCase())) {
                const possibleResponses = intent.responses;
                const randomIndex = Math.floor(Math.random() * possibleResponses.length);
                return possibleResponses[randomIndex];
            }
        }
    }

    // If no match is found, return a default response
    return "I'm sorry, I didn't understand that. For further assistance, please contact our support.";
}
