import { Router } from 'express';

const router = Router();

// Endpoint to generate text using AI
router.post('/generate', async (req, res) => {
  try {
    const { prompt, sectionName } = req.body;

    if (!prompt) {
      return res.status(400).json({ status: 'error', message: 'Missing prompt' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key is provided, return a simulated response
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.log('No GEMINI_API_KEY found. Returning simulated response.');
      const simulatedText = `(AI Simulated Response for "${sectionName}"): Solar energy provides a sustainable, cost-effective solution for reducing electricity bills and lowering carbon footprints. By installing modern solar systems, you can achieve up to 90% savings while contributing to a greener tomorrow. Contact our experts to discover how a customized solar plan can benefit your specific needs.`;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.status(200).json({ status: 'success', data: { text: simulatedText } });
    }

    // Call Google Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: `You are an expert copywriter for a top-tier Solar Energy company in India (Enfinite Energy). STRICT RULES: 1. ONLY return the raw, final copy. 2. DO NOT include any introductory, conversational text, greetings, or options (e.g. NEVER say "Here are two options"). 3. DO NOT use placeholders like [Location], use generic professional terms if details are missing. 4. Keep the output exactly 4 to 5 lines long. 5. Use simple, easy-to-understand, human-like English. Do not use overly complex jargon.` }]
        },
        contents: [{
          parts: [{ text: `Write highly professional website content based on this request: ${prompt}. (Context: This is for the ${sectionName} section).` }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate text from Gemini API');
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    res.status(200).json({ status: 'success', data: { text: generatedText.trim() } });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Endpoint for Chatbot
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ status: 'error', message: 'Missing message' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Simulated response if no API key
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.log('No GEMINI_API_KEY found. Returning simulated chat response.');
      const simulatedText = "I am a simulated AI assistant for Enfinite Energy. Please add a valid GEMINI_API_KEY to the backend .env file to enable advanced machine learning capabilities.";
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(200).json({ status: 'success', data: { text: simulatedText } });
    }

    const systemInstruction = "You are an AI assistant for Enfinite Energy (SOLAR SMILE). Answer customer questions about solar energy, PM Surya Ghar Yojana subsidies, and solar installations politely, professionally, and concisely. If they ask about prices, suggest they get a free site survey. Do not use formatting like bolding excessively. Limit responses to 2-3 sentences max.";

    // Map history to Gemini format
    const contents = history.map((msg: any) => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: contents
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate chat from Gemini API');
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I am having trouble answering that right now.';

    res.status(200).json({ status: 'success', data: { text: generatedText.trim() } });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
