# generate_tts.py
import sys
from TTS.api import TTS

text = sys.argv[1]
voice_type = sys.argv[2] if len(sys.argv) > 2 else "female"

# Load the model (change voice_type logic here if needed)
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

# Generate the audio
output_path = f"public/audio/output.wav"
tts.tts_to_file(text=text, file_path=output_path)

print(output_path)
