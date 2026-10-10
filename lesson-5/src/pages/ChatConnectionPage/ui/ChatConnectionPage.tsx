import { useEffect, useRef, useState } from 'react';
import { Card, Button } from '@shared/ui';
import styles from './ChatConnectionPage.module.css';

export const ChatConnectionPage = () => {
  const socketRef = useRef<WebSocket | null>(null);
  
  const [logs, setLogs] = useState<{id: string, time: string; msg: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org');
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);

    socket.onmessage = (event) => {
      const incomingText = event.data;
      console.log('Новое сообщение от сервера:', incomingText);
      
      setLogs(prev => [{
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        msg: `Входящее (Эхо): "${incomingText}"`
      }, ...prev]);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = (text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(text);
      
      setLogs(prev => [{
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(), 
        msg: `Отправлено: "${text}"`
      }, ...prev]);
    } 
  };

  return (
    <Card 
      title="Кейс 5: Внешние ресурсы" 
      subtitle="WebSocket"
    >
      <div className={styles.container}>
        <div className={styles.terminal}>
          {logs.length === 0 && <div className={styles.terminalLine}># Ожидание подключения к wss://echo.websocket.org...</div>}
          {logs.map((log) => (
            <div key={log.id} className={styles.terminalLine}>
              <span className={styles.timestamp}>[{log.time}]</span>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <Button onClick={() => sendMessage('Привет!')} variant="primary">
            Отправить сообщение
          </Button>

          <div className={`${styles.statusIndicator} ${isConnected ? styles.online : ''}`}>
            <div className={styles.dot} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>
    </Card>
  );
};
