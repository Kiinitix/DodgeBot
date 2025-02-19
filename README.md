# DodgeBot 

## Introduction  

AI Dodge Game is an interactive browser-based game where an AI-controlled target learns to evade bullets fired by the player. The AI adapts dynamically, making it harder to hit over time. The game is built using **JavaScript** and the **p5.js** library for rendering, with an adaptive AI movement strategy inspired by reinforcement learning.  

## How the AI Learns  

The AI follows a **reinforcement learning-inspired adaptive movement strategy**. It tracks its dodge success rate and adjusts its speed accordingly.  

### AI Movement and Dodging Strategy  

At each frame, the AI evaluates:  

- The position and velocity of incoming bullets  
- Its current position  
- The probability of successfully dodging a shot  

The AI moves left or right based on a **minimum distance principle**, ensuring it avoids bullets while minimizing unnecessary movements.

