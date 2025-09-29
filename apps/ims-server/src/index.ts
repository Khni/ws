import app from "./app.js";
import container, { appDeps } from "./container.js";

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  // After container.register(appDeps);

  try {
    for (const key of Object.keys(appDeps)) {
      container.resolve(key);
      console.log(`✅ ${key} resolved`);
    }
    console.log(`Server running on http://localhost:${PORT.toString()}`);
  } catch (err) {
    console.error(`❌ Failed to resolve a dependency:`, err);
    throw err; // fail fast
  }
});
