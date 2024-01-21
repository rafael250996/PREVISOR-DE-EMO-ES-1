from flask import Flask, render_template, request, jsonify
import prediction
import csv
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# API ouvindo solicitações POST e prevendo sentimentos
@app.route('/predict', methods=['POST'])
def predict():
    response = ""
    review = request.json.get('customer_review')
    if not review:
        response = {'status': 'error',
                    'message': 'Avaliação em Branco'}
    else:
        # Chamando o método predict do módulo de prediction.py
        sentiment, path = prediction.predict(review)
        response = {'status': 'success',
                    'message': 'Got it',
                    'sentiment': sentiment,
                    'path': path}
    return jsonify(response)

# Criando uma API para salvar a avaliação quando o usuário clica no botão Salvar
@app.route('/save', methods=['POST'])
def save():
    # Extraindo data, nome do produto, avaliação e sentimento associado dos dados JSON
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    product = request.json.get('product')
    review = request.json.get('review')
    sentiment = request.json.get('sentiment')

    # Criando uma variável final separada por vírgulas
    data_entry = f'{date},{product},{review},{sentiment}'

    # Abrindo o arquivo no modo 'append'
    file_path = 'reviews.csv'

    # Verificando se o arquivo existe, se não, criá-lo com um cabeçalho
    if not os.path.exists(file_path):
        with open(file_path, 'w', newline='') as csvfile:
            fieldnames = ['Date', 'Product', 'Review', 'Sentiment']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

    # Registrando os dados no arquivo CSV
    with open(file_path, 'a', newline='') as csvfile:
        fieldnames = ['Date', 'Product', 'Review', 'Sentiment']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow({'Date': date, 'Product': product, 'Review': review, 'Sentiment': sentiment})

    # Retornando uma mensagem de sucesso
    return jsonify({'status': 'success',
                    'message': 'Dados Registrados'})

if __name__ == "__main__":
    app.run(debug=True)
