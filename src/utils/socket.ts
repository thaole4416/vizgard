export function sendSocketMessage(socket: WebSocket, message: string): void {
  if (socket.readyState === 1) {
    socket.send(message);
  }
}
