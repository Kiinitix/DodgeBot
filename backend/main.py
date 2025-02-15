from fastapi import FastAPI, WebSocket
from ai_model import predict_bot_move, store_training_data
import asyncio

app = FastAPI()

@app.websocket("/game")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    difficulty = 0.4  # AI gets better over time
    
    while True:
        try:
            data = await websocket.receive_json()
            player_x, ball_x, ball_y = data["player_x"], data["ball_x"], data["ball_y"]

            bot_move = predict_bot_move(player_x, ball_x, difficulty)
            await websocket.send_json({"bot_move": bot_move})

            store_training_data(player_x, ball_x, bot_move)

            # Improve AI difficulty over time
            difficulty += 0.01

        except Exception:
            break
