# PixelMagic Backend (Render Deploy)

This is a minimal Node.js backend to connect your frontend to the Hugging Face instruct-pix2pix API.

## 🛠 Setup

1. **Create a new Web Service on [Render](https://render.com/)**
2. **Choose this repo or upload manually**
3. Set Environment Variables:
   - `HF_TOKEN=your_huggingface_token`

## 🚀 Endpoint

POST `/edit`

### Body:

```json
{
  "prompt": "Change shirt color to red",
  "imageBase64": "data:image/png;base64,..."
}
```

Returns: edited image in PNG format.