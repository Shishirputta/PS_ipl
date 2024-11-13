from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
print("exe")
# Load the model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()
    print(type(data))

    # Make a prediction
    prediction = model.predict([data])

    # Return the prediction
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
