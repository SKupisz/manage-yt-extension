# Manage YT Chrome Extension
This is the repo of the Google Chrome extension for downloading the videos from Youtube.

## Prerequisites needed to run

1. Python 3.10 and newer
2. Node v20.9.0 and newer
3. ffmeg installed

## How to setup?

1. Clone this repo to your local machine
2. `cd manageYTChromeExtension`
3. Run `chmod +x setup.sh`
4. Run `./setup.sh` (in case you are using Linux/Mac OS)


## How to run

1. `cd backend`
2. `uvicorn main:app --reload`
3. Open your browser
4. Go to `chrome://extensions`
5. Enable the developer mode
6. Click `load unpacked`
7. Select the `extension` directory

## How to run

1. `cd backend`
2. `uvicorn main:app --reload`
