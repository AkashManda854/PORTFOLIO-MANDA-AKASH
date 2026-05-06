"""
Portfolio Backend API - Flask Application
Serves portfolio data and handles file downloads
"""

from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime
from resume_parser import ResumeParser

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JSON_SORT_KEYS'] = False
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# Initialize Resume Parser
resume_path = os.getenv('RESUME_PATH', './data/resume.pdf')
resume_parser = ResumeParser(resume_path)

# ═══════════════════════════════════════════════════════════
# ROUTES
# ═══════════════════════════════════════════════════════════

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """
    Returns complete portfolio data
    """
    try:
        portfolio_data = resume_parser.parse()
        
        return jsonify({
            'success': True,
            'data': portfolio_data,
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        print(f"Error fetching portfolio: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/portfolio/education', methods=['GET'])
def get_education():
    """Returns education information"""
    try:
        education = resume_parser.extract_education()
        return jsonify({
            'success': True,
            'data': education
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/portfolio/experience', methods=['GET'])
def get_experience():
    """Returns work experience"""
    try:
        experience = resume_parser.extract_experience()
        return jsonify({
            'success': True,
            'data': experience
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/portfolio/skills', methods=['GET'])
def get_skills():
    """Returns technical skills"""
    try:
        skills = resume_parser.extract_skills()
        return jsonify({
            'success': True,
            'data': skills
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/portfolio/projects', methods=['GET'])
def get_projects():
    """Returns projects information"""
    try:
        projects = resume_parser.extract_projects()
        return jsonify({
            'success': True,
            'data': projects
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/portfolio/achievements', methods=['GET'])
def get_achievements():
    """Returns achievements and certifications"""
    try:
        achievements = resume_parser.extract_achievements()
        return jsonify({
            'success': True,
            'data': achievements
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/resume/download', methods=['GET'])
def download_resume():
    """
    Download resume PDF file
    """
    try:
        if not os.path.exists(resume_path):
            return jsonify({
                'success': False,
                'error': 'Resume file not found'
            }), 404
        
        return send_file(
            resume_path,
            as_attachment=True,
            download_name=f'Akash_Manda_Resume_{datetime.now().strftime("%Y%m%d")}.pdf',
            mimetype='application/pdf'
        )
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Portfolio API',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat()
    }), 200


@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        'service': 'Akash Manda Portfolio API',
        'version': '1.0.0',
        'endpoints': {
            'portfolio': '/api/portfolio',
            'education': '/api/portfolio/education',
            'experience': '/api/portfolio/experience',
            'skills': '/api/portfolio/skills',
            'projects': '/api/portfolio/projects',
            'achievements': '/api/portfolio/achievements',
            'resume': '/api/resume/download',
            'health': '/api/health'
        }
    }), 200


# ═══════════════════════════════════════════════════════════
# ERROR HANDLERS
# ═══════════════════════════════════════════════════════════

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


@app.before_request
def before_request():
    """Log incoming requests"""
    print(f"[{datetime.now()}] {request.method} {request.path}")


# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    print(f"🚀 Starting Portfolio API on port {port}")
    print(f"📄 Resume path: {resume_path}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
