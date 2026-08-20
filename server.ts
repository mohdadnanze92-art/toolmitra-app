import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Lazy Gemini client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) return null;
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // API Route for Gemini AI tool requests
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { toolType, prompt, options } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Return gracefully so client can use smart built-in algorithm
        return res.json({
          success: false,
          fallbackNeeded: true,
          message: 'GEMINI_API_KEY not set on server. Using built-in local engine.',
        });
      }

      let systemInstruction = 'You are ToolMitra AI, an intelligent online assistant that generates high quality, ready-to-use results for users.';
      let promptContent = prompt;

      if (toolType === 'ai-prompt-generator') {
        systemInstruction = 'You are an expert AI prompt engineer. Create 3 highly effective, detailed prompts formatted with clear placeholders, context, constraints, and instructions.';
        promptContent = `Generate optimized AI prompts for the following task/goal: "${prompt}". Options: ${JSON.stringify(options || {})}`;
      } else if (toolType === 'image-prompt-generator') {
        systemInstruction = 'You are a visual AI prompt artist. Generate 3 vivid, photorealistic or artistic prompts for Midjourney, DALL-E 3, and Stable Diffusion including camera angle, lighting, render engine, and style tags.';
        promptContent = `Create detailed image generation prompts for: "${prompt}". Style/Mood: ${options?.style || 'Cinematic Photorealistic'}. Aspect ratio: ${options?.aspectRatio || '16:9'}.`;
      } else if (toolType === 'youtube-title-generator') {
        systemInstruction = 'You are a viral YouTube strategist. Generate 5 high-CTR, engaging, click-worthy YouTube titles that follow best SEO practices without being misleading. Add short tags like [High CTR], [Curiosity], [How-To], [Viral].';
        promptContent = `Create 5 YouTube titles for a video about: "${prompt}". Target audience: ${options?.audience || 'General'}. Tone: ${options?.tone || 'Engaging & Catchy'}.`;
      } else if (toolType === 'hashtag-generator') {
        systemInstruction = 'You are a social media growth specialist. Generate 20-30 categorized, trending, and high-reach hashtags grouped into High Volume, Niche, and Community tags.';
        promptContent = `Generate Instagram/TikTok/YouTube hashtags for: "${prompt}". Platform: ${options?.platform || 'Instagram'}.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptContent,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const generatedText = response.text || '';
      return res.json({
        success: true,
        text: generatedText,
      });
    } catch (error: any) {
      console.error('Gemini generation error:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Failed to generate content',
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'ToolMitra AI Server',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ToolMitra AI Server running on port ${PORT} (host: 0.0.0.0)`);
  });
}

startServer();
