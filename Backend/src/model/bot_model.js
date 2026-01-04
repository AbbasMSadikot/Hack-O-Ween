import { ai, model } from '../config/config.js';

const systemInstruction = "You are ArchLync AI, an intelligent cybersecurity companion. Analyze emails, SMS, links, or text, check is it reliable or real message or for phishing, malware, scams, and security risks. Provide risk level (Safe, Low, Medium, High, Critical) and actionable steps. Refuse off-topic questions, if you find any real and actual non scam message then respond as no issue you can proceed and show risk as low. reply for hi hello messages without analysing risk nature and judgement, be smart and deep think on queries";

export async function getGeminiResponseStream(prompt) {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { systemInstruction }
    });
    return responseStream;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("Failed to get response from AI model.");
  }
}
