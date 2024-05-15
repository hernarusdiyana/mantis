import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import datetime
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import seaborn as sns
from keras.layers import Dense, BatchNormalization, Dropout, LSTM
from keras.models import Sequential
from keras.utils import to_categorical
from keras.optimizers import Adam
from tensorflow.keras import regularizers
from sklearn.metrics import precision_score, recall_score, confusion_matrix, classification_report, accuracy_score, f1_score
from keras import callbacks

np.random.seed(0)

# LOAD DATA
data = pd.read_csv("./pr_2020_2023.csv")
data.head()

data.info()

# DATA VISUALIZATIONI AND CLEANING
cols = ["#7F58AF","#64C5EB","#E84D8A","#FEB326"]
sns.countplot(x= data["pr_year"], palette=cols)

corrmat = data.corr()
cmap = sns.diverging_palette(260, -10, s=50, l=75, n=6, as_cmap=True)
plt.subplots(figsize=(18,18))
sns.heatmap(corrmat,cmap= cmap, annot=True, square=True)

# PARSING INTO DATETIME
lengths = data["pr_date"].str.len()
lengths.value_counts()

data['pr_date'] = pd.to_datetime(data['pr_date'])
data['pr_date'] = pd.to_datetime(data['pr_date'])
data['pr_date'] = pd.to_datetime(data['pr_date'])
data['year'] = data.pr_date.dt.year

# function to encode datetime into cyclic parameters. 
#As I am planning to use this data in a neural network I prefer the months and days in a cyclic continuous feature. 

def encode(data, col, max_val):
  data[col + '_sin'] = np.sin(2 * np.pi * data[col]/max_val)
  data[col + '_cos'] = np.cos(2 * np.pi * data[col]/max_val)
  return data

data['month'] = data.pr_date.dt.month
data = encode(data, 'month', 12)

data['day'] = data.pr_date.dt.day
data = encode(data, 'day', 31)

data.head()

# roughly a year's span section
section =data[:360]
tm = section["day"].plot(color="#7F58AF")
tm.set_title("Distribution of Days Over Year")
tm.set_ylabel("Days in Month")
tm.set_xlabel("Days in Year")

cyclic_month = sns.scatterplot(x="month_sin", y="month_cos", data=data, color="#7F58AF")
cyclic_month.set_title("cyclic encoding of month")
cyclic_month.set_ylabel("Cosince Encoded Months")
cyclic_month.set_xlabel("Sine Encoded Months")

cyclic_day = sns.scatterplot(x="day_sin", y="day_cos", data=data, color="#7F58AF")
cyclic_day.set_title("cyclic encoding of day")
cyclic_day.set_ylabel("Cosince Encoded days")
cyclic_day.set_xlabel("Sine Encoded days")

# Get list of categorical variables
s = (data.dtypes == "object")
object_cols = list(s[s].index)

print("Categorical variables:")
print(object_cols)

# Missing values in categorical variables
for i in object_cols:
    print(i, data[i].isnull().sum())
    
# Filling missing values with mode of the column in value
for i in object_cols:
    data[i].fillna(data[i].mode()[0], inplace=True)
    
# Get list of neumeric variables
t = (data.dtypes == "float64")
num_cols = list(t[t].index)

print("Neumeric variables:")
print(num_cols)

# Missing values in numeric variables
for i in num_cols:
    print(i, data[i].isnull().sum())
    
# Filling missing values with median of the column in value
for i in num_cols:
    data[i].fillna(data[i].median(), inplace=True)
    
data.info()

# Plotting  a lineplot rainfall over years
plt.figure(figsize=(12,8))
Time_series=sns.lineplot(x=data['pr_date'].dt.year,y="price", data=data, color="#7F58AF")
Time_series.set_title("price over years")
Time_series.set_ylabel("price")
Time_series.set_xlabel("years")


# DATA PREPROCESSING
# * Memberi label pada kolom pengkodean dengan data kategorikal
# * Melakukan penskalaan fitur
# * Mendeteksi pencilan
# * Menghilangkan pencilan berdasarkan analisis data

# Label Encoding the Categorical Variable
# Apply label Encoder to each column with categorical data
label_encoder = LabelEncoder()
for i in object_cols:
  data[i] = label_encoder.fit_transform(data[i])
data.info()