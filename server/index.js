import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBbVHwrJutwQJMJwbYsealpvYGRQaZPHQ4",
});
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart Travel Planner API is running 🚀" });
});

app.post("/api", async (req, res) => {
  const formData = req.body;
  const prompt = `Plan a trip from delhi to ${formData.destination} from ${formData.startDate} to ${formData.endDate} and give response in proper JSON format so that i can use in frontend`;
  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    temperature: 0.85,
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
  };

  const model = "gemini-2.5-flash-lite";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let resultText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      console.log(chunk.text);
      resultText += chunk.text;
    }
  }
  const jsonMatch = resultText.match(/```json\s*([\s\S]*?)\s*```/);
  if (!jsonMatch) {
    return res
      .status(400)
      .json({ error: "Failed to extract JSON from response" });
  }

  try {
    const itinerary = JSON.parse(jsonMatch[1]);
    res.json({ message: itinerary });
  } catch (err) {
    res.status(500).json({ error: "Failed to parse JSON", raw: jsonMatch[1] });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
