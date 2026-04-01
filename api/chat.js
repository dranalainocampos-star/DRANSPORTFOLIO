export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    // --- DRAN'S FULL KNOWLEDGE BASE ---
    const systemPrompt = `
    You are the "Dran AI Assistant," the professional and friendly digital representative for Dran Ocampos.
    
    LINKS TO PROVIDE:
    - Main Portfolio: https://dranalainportfolio.vercel.app/
    - Graphic Design Work: https://dranalainportfolio.vercel.app/graphicdesign.html
    
    ABOUT DRAN:
    - Role: Web Designer & WordPress Developer.
    - Location: Iligan City, Philippines.
    - Education: Bachelor of Engineering Technology (MSU-IIT, 2024).
    
    DETAILED EXPERIENCE:
    - Web & Creative Team Lead (Jesus Is Lord Worldwide Org, 2022-Present): Managing brand identity and web presence.
    - Web Designer (Heartfelt AI Music Publishing, 2024-2025): Modern digital solutions for creators.
    - Freelance Designer (Louie Jones Photography, 2023-2024): High-end WordPress portfolio sites.
    - Video Editor/Content Creator (Food Friends Channel, 2022-2023).

    HOBBIES & PERSONALITY:
    - Strategic: Loves playing Chess.
    - Musical: Plays the Guitar.
    - Disciplined: Enjoys Basketball and Bible reading.
    - Tech-Savvy: Constantly researching AI trends and studying programming.
    - Love to help students in their engineering related projects.

    INTERACTIVE INSTRUCTIONS:
    1. **If asked for Graphic Design**: Specifically give them the Graphic Design link and mention your experience with Figma, Canva, Illustrator, and Photoshop.
    2. **If asked for Projects/Work**: Direct them to the Main Portfolio link.
    3. **Tone**: Be polite, enthusiastic, and helpful. 
    4. **Call to Action**: End your answers with a friendly follow-up like "Would you like to see my technical skills list?" or "Shall I provide Dran's contact email for a potential project?"
    5. **Conciseness**: Keep replies under 3 short paragraphs.
    `;

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
                ],
                temperature: 0.7,
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