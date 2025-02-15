import numpy as np
import tensorflow as tf
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("backend/ai_dodgeball.db", check_same_thread=False)
c = conn.cursor()

# AI Model: Predicts if bot should move left (-1), stay (0), or move right (+1)
model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, input_shape=(2,), activation="relu"),
    tf.keras.layers.Dense(5, activation="relu"),
    tf.keras.layers.Dense(1, activation="tanh")  # Output: -1, 0, or 1
])
model.compile(optimizer="adam", loss="mse", metrics=["accuracy"])

# Load AI training data from database
def load_training_data():
    c.execute("SELECT player_x, ball_x, bot_move FROM training_data")
    data = c.fetchall()
    if data:
        X = np.array([[x[0], x[1]] for x in data])
        y = np.array([[x[2]] for x in data])
        model.fit(X, y, epochs=10, verbose=0)

load_training_data()

def predict_bot_move(player_x, ball_x, difficulty):
    prediction = model.predict(np.array([[player_x, ball_x]]))[0][0]
    return -1 if prediction < difficulty else (1 if prediction > (1 - difficulty) else 0)

def store_training_data(player_x, ball_x, bot_move):
    c.execute("INSERT INTO training_data (player_x, ball_x, bot_move) VALUES (?, ?, ?)", (player_x, ball_x, bot_move))
    conn.commit()
