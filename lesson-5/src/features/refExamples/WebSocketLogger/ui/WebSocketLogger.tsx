import { useEffect, useRef, useState } from 'react';
import { Card, Button } from '@shared/ui';
import styles from './WebSocketLogger.module.css';

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(isConnected ? 'Connected' : 'Disconnected');
  }, [isConnected]);

  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org');
    socketRef.current = socket;
    socket.onopen = () =>
      socket.onopen = () => {
        console.log('Соединение установлено');
        setIsConnected(true);
      }
    socket.onclose = () => setIsConnected(false);

    socket.onmessage = (event) => {
      const incomingText = event.data;
      console.log('Ответ:');
      console.log(`[${new Date().toLocaleTimeString()}] ${incomingText}`);
    };

    return () => {
      if (socketRef.current
        && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) {
        socketRef.current.close();
        socketRef.current = null;
        console.log('WebSocket соединение закрыто при размонтировании');
      }
    };
  }, []);

  const sendMessage = (text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(text);
      console.log('Отправлено:');
      console.log(`[${new Date().toLocaleTimeString()}] ${text}`);
    }
  };

  return (
    <Card
      title="5. Компонент WebSocketLogger (1.5 балла)"
      subtitle="WebSocket"
    >
      <div className={styles.container}>
        <h3>WebSocket Логгер: {isConnected ? 'Connected' : 'Disconnected'}</h3>
        <p>Откройте консоль браузера, чтобы увидеть входящие сообщения.</p>
      </div>

      <div className={styles.controls}>
        <Button
          disabled={!isConnected}
          onClick={() => sendMessage('lesson-5: useRef жив!')}
          variant={isConnected ? "primary" : "secondary"}>
          Отправить сообщение
        </Button>

        <div className={`${styles.statusIndicator} ${isConnected ? styles.online : ''}`}>
          <div className={styles.dot} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
    </Card>
  );
};
