import { Hono } from "hono";
import { cors } from "hono/cors";
import { getTodayInHistory, getLocationHistory } from "./wikipedia";

const app = new Hono<{ Bindings: Env }>();

app.use(cors());

app.get("/api/today-in-history", async (c) => {
  try {
    const language = (c.req.query("lang") || 'pt') as any;
    const data = await getTodayInHistory(language);
    return c.json(data);
  } catch (error) {
    console.error("Error fetching today in history:", error);
    return c.json({ error: "Failed to fetch today in history" }, 500);
  }
});

app.get("/api/location-history", async (c) => {
  const lat = parseFloat(c.req.query("lat") || "0");
  const lon = parseFloat(c.req.query("lon") || "0");
  const language = (c.req.query("lang") || 'pt') as any;
  
  if (!lat || !lon) {
    return c.json({ error: "Latitude and longitude are required" }, 400);
  }
  
  try {
    const history = await getLocationHistory(lat, lon, language);
    return c.json({ history });
  } catch (error) {
    console.error("Error fetching location history:", error);
    return c.json({ error: "Failed to fetch location history" }, 500);
  }
});

export default app;
