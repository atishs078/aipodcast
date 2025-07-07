import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConvertPage = () => {
  const [input, setInput] = useState('');
  const [summarize, setSummarize] = useState(true);
  const [voiceType, setVoiceType] = useState('female');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleConvert = async () => {
    if (!input.trim()) {
      toast.error("❗ Please enter blog content or URL.");
      return;
    }

    setLoading(true);
    setAudioUrl('');

    try {
      const res = await fetch('http://localhost:5000/api/podcast/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, summarize, voiceType })
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Podcast generated successfully!");
        setAudioUrl(data.audioUrl);
      } else {
        toast.error("❌ Failed to generate audio.");
      }
    } catch (err) {
      toast.error("🚨 Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        
        <div className="text-center mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/538px-Google_Drive_icon_%282020%29.svg.png"
            alt="Logo"
            className="w-12 h-12 mx-auto mb-2"
          />
          <h1 className="text-3xl font-semibold text-gray-800">🎧 Blog to Podcast</h1>
          <p className="text-gray-500">Convert blog content into beautiful podcasts instantly</p>
        </div>

        <textarea
          placeholder="Paste your blog content or URL..."
          className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={summarize}
              onChange={() => setSummarize(!summarize)}
              className="accent-blue-600"
            />
            Summarize Blog
          </label>

          <select
            value={voiceType}
            onChange={(e) => setVoiceType(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="female">👩 Female Voice</option>
            <option value="male">👨 Male Voice</option>
            <option value="ai">🤖 AI Voice</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition-all duration-300 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '⏳ Generating Podcast...' : '🎙️ Convert to Podcast'}
        </button>

        {audioUrl && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔊 Your Podcast</h3>
            <audio controls src={audioUrl} className="w-full rounded-md shadow-md" />
            <a
              href={audioUrl}
              download
              className="inline-block mt-3 text-blue-600 hover:underline text-sm"
            >
              ⬇️ Download Audio File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertPage;
