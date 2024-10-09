from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pytubefix import YouTube
from pytubefix.cli import on_progress
from dotenv import load_dotenv, dotenv_values
from pydantic import BaseModel
import subprocess
import os

load_dotenv()

origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

SAVE_PATH=os.getenv("SAVING_PATH")

class VideoData(BaseModel):
    videoType: str

@app.get('/')
async def root():
    return {'status': 'running'}

@app.post('/download/{videoId}')
async def download(videoId: str, data: VideoData):
    link = "https://www.youtube.com/"
    if data.videoType == 'shorts':
        link += 'shorts/'
    else:
        link += 'watch?v='
    link += videoId

    try:
        yt = YouTube(link, on_progress_callback = on_progress)
        ys = yt.streams.get_highest_resolution()
        ys.download(output_path=SAVE_PATH)
        script = 'display notification "Your video has been downloaded!" with title "Manage YT Chrome Extension"'
        subprocess.run(["osascript", "-e", script])
        return {
            'status': 'success'
        }
    except Exception as e:
        script = 'display notification "We failed to download your video! Try again" with title "Manage YT Chrome Extension"'
        subprocess.run(["osascript", "-e", script])
        return {
            'status': 'failed',
            'error': str(e)
        }