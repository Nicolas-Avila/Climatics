// router.js (o donde tengas tus rutas)
import express from "express";
import cors from "cors";
import { clothingTemperature } from "../api/IAmodel.js";
import { obteinWeather } from "../api/weatheIp.js";  // Importar para obtener temp

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/ropa", async (req, res) => {
  try {
    const { ropa, temp } = await clothingTemperature();
    res.json({
      resultado: ropa,
      temperatura: temp
    });
    
      // temperatura string, ej: "12.3°C"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la solicitud de la IA" });
  }
});

router.get("/clima", async (req, res) => {
  try {
    const respuesta = await getFullWeatherData();
    res.json({ resultado: respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la solicitud del clima" });
  }
});

export default router;
