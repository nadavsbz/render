const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/edit", async (req, res) => {
  const { prompt, imageBase64 } = req.body;

  if (!prompt || !imageBase64) {
    return res.status(400).json({ error: "Missing prompt or image" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          prompt,
          image: imageBase64,
        },
        parameters: {
          guidance_scale: 1.5,
          num_inference_steps: 20,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: "Hugging Face API error", details: err });
    }

    const result = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(result));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("PixelMagic API is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});