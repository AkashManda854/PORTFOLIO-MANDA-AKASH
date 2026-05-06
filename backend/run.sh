#!/bin/bash

# Portfolio Backend Startup Script

echo "🚀 Starting Akash Manda Portfolio Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if virtual environment exists, if not create it
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration"
fi

# Create data directory if it doesn't exist
if [ ! -d "../data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p ../data
fi

# Run the Flask application
echo "🎯 Starting Flask server..."
python3 app.py
