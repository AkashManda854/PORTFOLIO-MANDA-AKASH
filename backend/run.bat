@echo off
REM Portfolio Backend Startup Script for Windows

echo 🚀 Starting Akash Manda Portfolio Backend...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if virtual environment exists, if not create it
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo ✅ Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please update .env file with your configuration
)

REM Create data directory if it doesn't exist
if not exist "..\data" (
    echo 📁 Creating data directory...
    mkdir ..\data
)

REM Run the Flask application
echo 🎯 Starting Flask server...
python app.py

pause
