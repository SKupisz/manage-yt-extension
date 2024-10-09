echo "Setup procedure launched..."

echo "Creating a virtual envirnonment..."
cd backend
python3 -m venv venv

echo "Installing packages needed for the backend..."
pip install pytubefix pytube fastapi dotenv
touch .env

read -p "Enter the video saving directory: " dir
echo SAVING_PATH=dir >> .env

echo "Backend setup finished..."

cd ../extension

echo "Initializing the chrome extension setup..."

npm install
npm run build:items

cd ..

echo "Setup finished..."