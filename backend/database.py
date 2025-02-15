import sqlite3

def setup_database():
    conn = sqlite3.connect("ai_dodgeball.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS training_data (
            player_x REAL,
            ball_x REAL,
            bot_move INTEGER
        )
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    setup_database()
