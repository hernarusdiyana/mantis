import numpy as np

class ANNModel:
    def __init__(self, input_size, hidden_size, output_size):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        
        # Inisialisasi bobot dan bias secara acak
        self.weights_input_hidden = np.random.randn(input_size, hidden_size)
        self.bias_input_hidden = np.random.randn(hidden_size)
        self.weights_hidden_output = np.random.randn(hidden_size, output_size)
        self.bias_hidden_output = np.random.randn(output_size)
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def forward(self, input_data):
        # Perhitungan forward pass
        hidden_input = np.dot(input_data, self.weights_input_hidden) + self.bias_input_hidden
        hidden_output = self.sigmoid(hidden_input)
        output = np.dot(hidden_output, self.weights_hidden_output) + self.bias_hidden_output
        return output

# Contoh penggunaan model ANN
input_size = 2
hidden_size = 3
output_size = 1
model = ANNModel(input_size, hidden_size, output_size)

# Contoh prediksi harga untuk data input [3, 5]
input_data = np.array([3, 5])
predicted_price = model.forward(input_data)
print("Predicted Price:", predicted_price)
