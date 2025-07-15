import express from "express";
import router from "./Routes/router.js";

const app = express();
const PORT = 3000;

app.use("/api", router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

