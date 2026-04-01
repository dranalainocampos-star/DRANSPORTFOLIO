// ==========================================
// 1. THEME TOGGLE LOGIC
// ==========================================
function toggleTheme() {
  const html = document.documentElement;
  const profilePic = document.getElementById("profile-pic");
  const btn = document.getElementById("theme-btn");
  
  // Check current theme
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  // Set the new theme attribute
  html.setAttribute("data-theme", newTheme);
  
  // Swap the Image
  if (newTheme === "dark") {
    profilePic.src = "images/profile-night.png"; // Your night photo path
    btn.innerHTML = "☀️ Light Mode";
  } else {
    profilePic.src = "images/profile2.png";      // Your original photo path
    btn.innerHTML = "🌙 Dark Mode";
  }
  
  // Save selection so it stays when the page refreshes
  localStorage.setItem("theme", newTheme);
}

// ==========================================
// 2. CHAT WIDGET TOGGLE LOGIC
// ==========================================
const chatWidgetBtn = document.getElementById('chat-widget-button');
const chatContainer = document.getElementById('chat-container');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatCta = document.getElementById('chat-cta');

// Toggle chat window when floating button is clicked
chatWidgetBtn.addEventListener('click', () => {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex'; // Show chat
        chatCta.style.display = 'none';       // Hide the "Talk to Dran!" CTA forever
    } else {
        chatContainer.style.display = 'none'; // Hide chat
    }
});

// Close chat when the "X" is clicked
closeChatBtn.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// ==========================================
// 3. GROQ AI CHAT LOGIC
// ==========================================
// 🚨 REPLACE THIS WITH YOUR ACTUAL GROQ API KEY 🚨
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE"; 

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const systemPrompt = `You are the official portfolio assistant for Dran Ocampos. 
Here is Dran's information:
- Role: Web Designer
- Location: Iligan City, Philippines
- Contact: dranalain.ocampos@g.msuiit.edu.ph or https://dranalainportfolio.vercel.app/
- Summary: WordPress Web Designer focused on transforming outdated or unstructured websites into clean, modern, and user-friendly platforms.
- Education: Bachelor of Engineering Technology from Mindanao State University - Philippines (Sep 2020 - May 2024).

Technical Skills:
- Web: WordPress (Elementor, Gutenberg), HTML, CSS, JavaScript, PHP (basic), Responsive Web Design.
- Design Tools: Figma, Canva, Adobe Illustrator, Adobe Photoshop.

Experience:
- Web & Creative Team Lead at Jesus Is Lord Worldwide Org. (2022 to Present)
- Web Designer & WordPress Developer at Heartfelt Al Music Publishing (2024-2025)
- Web Designer & WordPress Developer for Louie Jones - Photographer (2023-2024)
- Video Editor & Content Creator for Food Friends Channel (2022-2023)

Hobbies:
- Chess
- Basketball
- Bible Reading
- Play Guitar
- Study About Programming
- Research About AI

Rules: Be polite, incredibly concise (1-2 short paragraphs max), and only answer questions related to Dran's professional background. Do not use complex formatting.`;
async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatInput.value = '';

    const typingId = appendMessage('Typing...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }) // ONLY send the user message
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById(typingId).textContent = data.reply;
        } else {
            document.getElementById(typingId).textContent = "Error: " + (data.error || "Server failed");
        }

    } catch (error) {
        console.error(error);
        document.getElementById(typingId).textContent = "Error: Connection lost.";
    }
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    
    if (sender === 'bot') {
        msgDiv.id = 'msg-' + Date.now();
    }
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv.id;
}

// 💡 THESE ARE THE MISSING LINES THAT MAKE THE BUTTON WORK:
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});