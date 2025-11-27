from flask import Flask, send_file
from flask_cors import CORS
import report_generator
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/generate-report")
def generate_report():
    pdf_path = report_generator.main()

    if not os.path.exists(pdf_path):
        return "Ошибка: PDF не создан", 500

    return send_file(pdf_path, as_attachment=True)

@app.route("/")
def home():
    return "Сервер работает!"

if __name__ == "__main__":
    app.run(debug=True)
