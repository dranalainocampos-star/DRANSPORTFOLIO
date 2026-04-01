export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    // THE BRAIN LIVES HERE NOW
    const systemPrompt = `You are the official portfolio assistant for Dran Ocampos. 
    Dran is a Web Designer & WordPress Developer from Iligan City.
    Skills: WordPress (Elementor), HTML, CSS, JavaScript.
    Experience: Web Lead at JIL, Heartfelt AI Music Publishing.
    Rules: Be concise. Only answer about Dran.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "Groq API error" });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}