export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const userMessage = req.body.message;

        // The system prompt (your resume info) stays securely on the server!
        const systemPrompt = `You are the official portfolio assistant for Dran Ocampos... (Paste your full prompt here!)`;

        // The server makes the call to Groq
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // We use an Environment Variable here so the key is NOT in the code!
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}` 
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        
        // Send Groq's reply back to your frontend
        res.status(200).json({ reply: data.choices[0].message.content });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
}