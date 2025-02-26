# Intellimation-AI

Project Overview
Intellimation is an Intelligent Process Automation (IPA) solution designed to automate various tasks across industries. It leverages AI/ML technologies to streamline processes such as data entry, document processing, customer service automation, voice command handling, code documentation generation, and AI-powered decision-making. This project aims to improve efficiency, reduce human error, and optimize workflows by automating complex tasks.

Features
1)Automated Emails
 -Automates the process of composing, sending, and managing emails.
 -Integrates sentiment analysis to dynamically adjust email workflows based on tone (e.g., escalate negative emails).

2)Process Intuition via Predictive Bottleneck Analysis
 -Uses ML to predict potential workflow slowdowns and takes proactive measures to optimize processes.
 -Provides early alerts and suggestions for process improvement.

3)Sentiment-Driven Workflow Routing
 -Analyzes emotional tone in text data (e.g., emails, feedback) to dynamically route tasks.
 -Escalates tasks based on sentiment analysis (e.g., prioritizing negative feedback).

4)Multi-Function Automation
 -Automates multiple functions such as data entry, document processing, and customer service automation.
 -Integrates voice-to-action features and auto-code documentation.

5)AI-Powered Decision Maker
 -Suggests actions based on extracted data patterns.
 -Uses machine learning to predict optimal decisions based on historical data.

6)Voice-to-Action
 -Processes voice commands and triggers corresponding automation actions.
 -Uses the Google Speech Commands Dataset to integrate voice functionality.

7)Auto-Code Documentation
 -Automatically generates technical documentation from codebases.
 -Uses the CodeSearchNet Dataset for real code documentation generation.

8)Adaptive Learning
 -Continuously improves the automation processes based on user interactions.
 -Refines the system over time to enhance accuracy and efficiency.

Technologies Used
-Backend: Python (Flask), TensorFlow, PyTorch
-Frontend: React.js (for UI), Material-UI (for styling)
-Machine Learning: scikit-learn, Natural Language Processing (NLP), Sentiment Analysis, Deep Learning
-Voice Command Processing: Google Speech API, Speech Recognition
-DevOps: GitHub Actions (CI/CD)

Project Structure

intelligent-automation/
│── backend/                                # Backend Folder (Python)
│   │── pycache/                            # Compiled Python bytecode files (auto-generated)
│   │── models/                             # Model storage and machine learning files
│   │   │── datasets/                       # Datasets used for training models
│   │   │   │── voice_commands/             # Dataset for voice command processing
│   │   │   │── adaptive_learning_data.csv  # Dataset for adaptive learning
│   │   │   │── auto_code_data.csv          # Dataset for auto-code documentation
│   │   │   │── bottleneck_data.csv         # Dataset for bottleneck analysis
│   │   │   │── decision_data.csv           # Dataset for decision-making model
│   │   │   │── documented_code.csv         # Dataset for documenting code
│   │   │   │── sentiment_data.csv          # Dataset for sentiment analysis
│   │   │   │── voice_transcriptions.csv    # Dataset for transcribing voice data
│   │   │── adaptive_learning.pkl           # Pickled model for adaptive learning
│   │   │── auto_code_model.pkl             # Pickled model for auto-code documentation
│   │   │── bottleneck_model.pkl            # Pickled model for bottleneck analysis
│   │   │── decision_model.pkl             # Pickled model for decision-making
│   │   │── decision_scaler.pkl             # Scaler for decision model
│   │   │── sentiment_model.pkl            # Pickled model for sentiment analysis
│   │   │── train_all.py                    # Script to train all models
│   │   │── vectorizer.pkl                  # Pickled vectorizer used for feature extraction
│   │   │── voice_model.pkl                 # Pickled model for voice command processing
│   │── services/                            # Service files containing logic for different functionalities
│   │   │── pycache/                        # Compiled Python bytecode files (auto-generated)
│   │   │── adaptive_learning.py            # Service for adaptive learning functionality
│   │   │── ai_decision_maker.py            # Service for decision-making logic
│   │   │── auto_code_doc.py                # Service for auto-code documentation
│   │   │── bottleneck_analysis.py          # Service for bottleneck analysis
│   │   │── sentiment_analysis.py           # Service for sentiment analysis
│   │   │── voice_to_action.py              # Service for voice-to-action functionality
│   │── utils/                               # Utility functions for backend processing
│   │   │── pycache/                        # Compiled Python bytecode files (auto-generated)
│   │   │── config.py                       # Configuration file for the backend (e.g., API keys, settings)
│   │   │── gmail_auth.py                   # Authentication logic for Gmail API
│   │   │── preprocess.py                   # Preprocessing utilities (e.g., data cleaning)
│   │   │── process_voice_data.py           # Process voice data (for voice-to-action feature)
│   │── venv/                               # Virtual environment for Python dependencies (e.g., Flask, TensorFlow)
│   │── __init__.py                         # Initialize the backend module
│   │── .env                                # Environment file for storing sensitive credentials
│   │── app.py                              # Main backend app file (e.g., Flask application)
│   │── credentials.json                    # Google API credentials for authentication
│   │── google_credentials.json             # Credentials for Google services (API usage)
│   │── main.py                             # Main entry point for backend services
│   │── token.pickle                        # Pickle file for storing authentication token

│── frontend/                              # Frontend Folder (React.js)
│   │── public/                            # Static files
│   │   │── vite.svg                       # Vite logo (for development)
│   │   │── about-image.png                # About page image
│   │   │── ailearning.gif                 # GIF for AI Learning
│   │   │── emails.gif                     # GIF for email automation
│   │   │── future.png                     # Future vision image
│   │   │── logo.png                       # Logo image for the app
│   │   │── mic.gif                        # GIF for microphone usage
│   │   │── react.svg                      # React logo
│   │   │── recordingwave.gif             # GIF for audio recording feature
│   │── components/                        # React components
│   │   │── Button.jsx                     # Reusable button component
│   │   │── ErrorBoundary.jsx              # Error boundary component for graceful error handling
│   │   │── Navbar.jsx                     # Navbar component (for navigation)
│   │   │── Sidebar.jsx                    # Sidebar component (for navigation)
│   │── pages/                             # Page components for different views
│   │   │── AdaptiveLearning.jsx           # Page for adaptive learning functionality
│   │   │── AutoCodeDoc.jsx                # Page for auto-code documentation
│   │   │── DecisionMaker.jsx              # Page for decision-making functionality
│   │   │── EmailAutomation.jsx            # Page for email automation
│   │   │── Home.jsx                       # Home page
│   │   │── VoiceToAction.jsx              # Page for voice-to-action functionality
│   │   │── WorkflowAnalytics.jsx          # Page for workflow analytics
│   │── App.css                            # Main styling file for the app
│   │── App.jsx                            # Main React app file
│   │── EmailForm.jsx                      # Form component for email input (used in EmailAutomation)
│   │── index.css                          # Global CSS for the app
│   │── main.jsx                           # Entry point for React application
│   │── .gitignore                         # Git ignore file (to exclude unnecessary files)
│   │── eslint.config.js                   # ESLint configuration file
│   │── index.html                         # Main HTML file
│   │── package-lock.json                  # Dependency lock file
│   │── package.json                       # Frontend dependencies and metadata
│   │── README.md                          # Project documentation (frontend details)
│   │── vite.config.js                     # Vite configuration file for the build process
│── node_modules/                          # Node.js dependencies (generated on install)
│── temp/                                  # Temporary folder (e.g., for build-related files)
│── venv/                                  # Virtual environment (for backend Python dependencies, typically excluded from frontend)


Key Files
-train_all.py: Script used to train and fine-tune all the machine learning models.
-models/: Directory where all pre-trained models are stored.
-app.py: Main Flask app that runs the server and integrates all functionalities.
-credentials.json: Stores sensitive credentials for third-party services (e.g., Google APIs).

How It Works
1. Automated Emails
The system can generate and send emails based on specified criteria (e.g., sentiment analysis).
Email automation can escalate tasks by analyzing the emotional tone of the email.
2. Predictive Bottleneck Analysis
The system predicts potential delays in workflows by analyzing past data and historical bottlenecks.
Alerts are sent to the user to prevent delays and optimize task management.
3. Sentiment-Driven Workflow Routing
The system analyzes the sentiment of incoming data (e.g., emails) to decide how to route the task.
Tasks with negative sentiment are prioritized for escalation.
4. Voice-to-Action
Users can provide voice commands, and the system triggers predefined actions based on those commands.
5. AI-Powered Decision Making
The system uses machine learning models to analyze data and suggest the best course of action.

Contact
For any inquiries or feedback, please contact:
Miashmi Dileep
Email: miashmid@gmail.com
