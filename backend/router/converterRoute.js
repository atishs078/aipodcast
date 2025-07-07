// server/routes/tts.js
const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const router = express.Router();

router.post('/convert', (req, res) => {
  const { input, voiceType } = req.body;

  if (!input) {
    return res.status(400).json({ success: false, error: 'Text input required' });
  }

  const scriptPath = path.join(__dirname, '..', 'python', 'generate_tts.py');

  execFile('python', [scriptPath, input, voiceType || 'female'], (error, stdout, stderr) => {
  if (error) {
    console.error('TTS error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate audio' });
  }

  const lines = stdout.toString().trim().split('\n');
  const lastLine = lines[lines.length - 1]; // Should be 'public/audio/output.wav'
  const outputPath = lastLine.replace('public/', '');

  const audioUrl = `${req.protocol}://${req.get('host')}/${outputPath}`;
  return res.json({ success: true, audioUrl });
});

});

module.exports = router;
