import dotenv from "dotenv";
import OpenAI from "openai";
import { obteinWeather } from "./weatheIp.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function clothingTemperature() {
  // Obtenemos la temperatura y ubicación
  const temp = await obteinWeather();

  const prompt = `La temperatura actual es ${temp}. Quiero que me recomiendes las prendas adecuadas para cada parte del cuerpo: cabeza, parte superior, parte inferior y pies.

Para cada parte, indicá entre 1 y 3 prendas recomendadas, ordenadas según el uso habitual. Cada prenda debe ser un ítem separado en la lista.

🚫 No uses la palabra "o" dentro del nombre de ninguna prenda.  
🚫 No combines prendas en una sola string.  
✅ Cada prenda debe ir por separado, aunque sean similares.  
✅ Por ejemplo, en lugar de "gorro de lana o algodón", debe ser:
["gorro de lana", "gorro de algodón"]

Usá nombres comunes en Argentina (como "remera", "campera", "zapatillas"), sin modismos ni apodos, y describí el tipo o material cuando corresponda (por ejemplo: "remera fina de algodón", "musculosa de algodón", "campera térmica con polar", "jean ajustado", "pantalón de gabardina", "botas de cuero", etc.).

Si alguna prenda es opcional, anteponé la palabra "opcional:" seguido de la prenda. Por ejemplo: "opcional: bufanda de lana".

Devolvé un JSON válido con esta estructura, donde cada valor es un arreglo con las prendas recomendadas, en orden:

{
  "cabeza": ["prenda1", "prenda2"],
  "parte_superior": ["prenda1", "prenda2", "prenda3"],
  "parte_inferior": ["prenda1", "prenda2"],
  "pies": ["prenda1", "prenda2"]
}

⚠️ Recordá: No está permitido usar la palabra “o” dentro de los nombres de las prendas. Cada prenda debe ir en un ítem separado.`;

  const conversationHistory = [
    { role: "user", content: prompt }
  ];

  try {
    const chat = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2:free",
      messages: conversationHistory,
    });

    const raw = chat.choices[0].message.content;

    console.log("\nRespuesta IA:\n", raw);

    const jsonClean = raw.replace(/```json|```/g, "").trim();

    let ropa;
    try {
      ropa = JSON.parse(jsonClean);
    } catch (e) {
      console.error("JSON inválido recibido de la IA:", e);
      throw new Error("La IA no devolvió un JSON válido");
    }

    return {
      ropa,     // objeto con la recomendación
      temp      // string con ubicación + temperatura
    };

  } catch (error) {
    console.error("Error al consultar OpenAI:", error);
    throw error;
  }
}
