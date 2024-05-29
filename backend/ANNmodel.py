import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
import numpy as np

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Definisikan data
data = {
    'brand': ['BrandA', 'BrandB', 'BrandC', 'BrandA', 'BrandB', 'BrandC', 'BrandA', 'BrandB', 'BrandC'],
    'model': ['Model1', 'Model2', 'Model3', 'Model4', 'Model5', 'Model6', 'Model7', 'Model8', 'Model9'],
    'processor': ['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'Intel i5', 'Intel i7', 'AMD Ryzen 7', 'Intel i3', 'Intel i9', 'AMD Ryzen 5'],
    'ram': [8, 16, 8, 8, 16, 16, 4, 32, 8],
    'storage': [256, 512, 256, 512, 512, 512, 128, 1024, 256],
    'price': [800, 1200, 700, 850, 1250, 1100, 600, 2000, 750]
}

# Buat DataFrame
df = pd.DataFrame(data)

# Simpan ke file CSV
df.to_csv('laptops.csv', index=False)

#--- DATA PREPARATION
# Muat dataset
data = pd.read_csv('laptops.csv')

# One-Hot Encoding untuk fitur kategorikal
encoder = OneHotEncoder()
brand_encoded = encoder.fit_transform(data[['brand']]).toarray()
model_encoded = encoder.fit_transform(data[['model']]).toarray()
processor_encoded = encoder.fit_transform(data[['processor']]).toarray()

# Gabungkan hasil encoding dengan fitur numerik
X = np.hstack((brand_encoded, model_encoded, processor_encoded, data[['ram', 'storage', 'screen_size', 'battery']].values))
y = data['price'].values

# Bagi data menjadi set pelatihan dan pengujian
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalisasi fitur numerik
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ---- TRAINING ANN MODEL
# Buat model ANN
model = Sequential([
    Dense(64, input_dim=X_train.shape[1], activation='relu'),
    Dense(32, activation='relu'),
    Dense(1)  # Output layer
])

# Kompilasi model
model.compile(optimizer='adam', loss='mean_squared_error')

# Latih model
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2)