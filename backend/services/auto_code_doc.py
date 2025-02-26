import google.generativeai as genai
import os
import json

# Get base directory
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))

# Load Google Gemini API key
CREDENTIALS_PATH = os.path.join(BASE_DIR, "backend/google_credentials.json")

if os.path.exists(CREDENTIALS_PATH):
    with open(CREDENTIALS_PATH) as f:
        credentials = json.load(f)
        GOOGLE_GEMINI_API_KEY = credentials.get("GOOGLE_GEMINI_API_KEY")
else:
    GOOGLE_GEMINI_API_KEY = os.environ.get("GOOGLE_GEMINI_API_KEY")

if not GOOGLE_GEMINI_API_KEY:
    raise ValueError("❌ Google Gemini API key is missing. Set it in google_credentials.json or as an environment variable.")

# Configure Gemini AI API
genai.configure(api_key=GOOGLE_GEMINI_API_KEY)

def generate_code_documentation(code_snippet):
    """
    Generates a detailed docstring for a given Python code snippet using Google Gemini AI.
    """
    model = genai.GenerativeModel("gemini-pro")  # Use the correct model name
    prompt = f"Generate a detailed Python docstring for the following function:\n\n{code_snippet}\n\n### Docstring:"
    
    try:
        response = model.generate_content(prompt)  # Correct method call
        return response.text.strip() if response.text else "No response generated."
    except Exception as e:
        print(f"❌ Error generating documentation: {e}")
        return "Error generating documentation"
