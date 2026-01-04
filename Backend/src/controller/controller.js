import { getGeminiResponseStream } from "../model/bot_model.js";
import { UserPrompt } from "../model/db_model.js";
function detectRiskType(responseText) {
  if (!responseText) return "low";
  const cleanText = responseText.toLowerCase().replace(/[^\w\s]/g, "");
  const words = cleanText.split(/\s+/);
  const criticalKeywords = ["critical"];
  const mediumKeywords = ["medium"];
  const lowKeywords = ["low"];
  if (words.some(word => criticalKeywords.includes(word))) return "critical";
  if (words.some(word => mediumKeywords.includes(word))) return "medium";
  if (words.some(word => lowKeywords.includes(word))) return "low";
  return "low";
}

export async function sendMessage(req, res) {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const count = await UserPrompt.countDocuments();
    const queryNo = count + 1;

    let fullResponse = "";
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Connection", "keep-alive");

    try {
      const stream = await getGeminiResponseStream(prompt);

      for await (const chunk of stream) {
        if (chunk.text) {
          res.write(chunk.text);
          fullResponse += chunk.text;
        }
      }
      res.end();
      const riskType = detectRiskType(fullResponse);
      await new UserPrompt({
        queryNo,
        query: prompt,
        riskType,
        time: new Date(),
      }).save();

      console.log(`🧩 Saved Risk Type: ${riskType} for queryNo: ${queryNo}`);

    } catch (error) {
      console.error("AI Stream Error:", error.message);
      res.status(500).end("AI Error: Failed to process request.");
    }

  } catch (err) {
    console.error("DB Save Error:", err.message);
    return res.status(500).json({ error: "Failed to save prompt" });
  }
}

export function getStatus(req, res) {
  res.json({
    status: "Operational",
    service: "ArchLync AI Backend",
    model: "gemini-2.5-flash",
    message: "Ready for analysis.",
    timestamp: new Date().toISOString(),
  });
}
