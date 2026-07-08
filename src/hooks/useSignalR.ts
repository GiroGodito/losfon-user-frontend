// src/hooks/useSignalR.ts
import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from '../context/AuthContext';
import { useToast } from './useToast';
import { eventStore } from '../store/eventStore';

const SIGNALR_URL = import.meta.env.VITE_SIGNALR_URL || 'https://localhost:7149/notificationHub';

export const useSignalR = () => {
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<any>(null);
  const [reconnectCount, setReconnectCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('🚫 NOT AUTHENTICATED - Stopping SignalR connection');
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        setIsConnected(false);
        setConnectionError(null);
      }
      return;
    }

    if (connectionRef.current) {
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_URL, {
        withCredentials: true,
        timeout: 30000,
        skipNegotiation: false,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          const delays = [0, 2000, 10000, 30000, 60000];
          const delay = delays[retryContext.previousRetryCount] || 60000;
          console.log(`🔄 SignalR retry #${retryContext.previousRetryCount + 1}, waiting ${delay}ms`);
          return delay;
        }
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    // ============ ✅ ITEM FOUND (Cold Case & Lost Items) ============
    connection.on('ItemFound', (data) => {
      console.log('🎉 ===== ITEM FOUND NOTIFICATION RECEIVED =====');
      console.log('📦 Data:', JSON.stringify(data, null, 2));
      console.log('📝 Message:', data?.message);
      console.log('🆔 Lost Item ID:', data?.lostItemId);
      console.log('📄 Item Description:', data?.itemDescription);
      
      setLastNotification(data);
      
      // ✅ Show toast to user
      if (data?.message) {
        showToast(data.message, 'success');
      } else {
        showToast('🎉 Your lost item has been found!', 'success');
      }
      
      // ✅ Emit event to refresh lost items list
      eventStore.emit('itemFound', data);
    });

    // ============ ✅ ITEM CLAIMED ============
    connection.on('ItemClaimed', (data) => {
      console.log('✅ ===== ITEM CLAIMED NOTIFICATION RECEIVED =====');
      console.log('📦 Data:', JSON.stringify(data, null, 2));
      
      setLastNotification(data);
      
      if (data?.message) {
        showToast(data.message, 'success');
      } else {
        showToast('✅ Item claimed successfully!', 'success');
      }
      
      eventStore.emit('itemClaimed', data);
      eventStore.emit('itemsUpdated', data);
    });

    // ============ ✅ NEW LOST ITEM REPORTED (Admin broadcast) ============
    connection.on('NewLostItemReported', (data) => {
      console.log('📨 ===== NEW LOST ITEM REPORTED =====');
      console.log('📦 Data:', JSON.stringify(data, null, 2));
      setLastNotification(data);
      eventStore.emit('newLostItem', data);
    });

    // ============ ✅ COLD CASE ITEM FOUND (Admin broadcast) ============
    connection.on('ColdCaseItemFound', (data) => {
      console.log('📦 ===== COLD CASE ITEM FOUND (Admin broadcast) =====');
      console.log('📦 Data:', JSON.stringify(data, null, 2));
      // This is for admin dashboard updates, not for user notifications
      // User already gets 'ItemFound' above
    });

    // ============ CONNECTION EVENTS ============
    connection.onreconnecting((error) => {
      console.warn('🔄 ===== SIGNALR RECONNECTING =====');
      setReconnectCount(prev => prev + 1);
      setIsConnected(false);
      setConnectionError('Reconnecting...');
    });

    connection.onreconnected((connectionId) => {
      console.log('✅ ===== SIGNALR RECONNECTED =====');
      setIsConnected(true);
      setConnectionError(null);
    });

    connection.onclose((error) => {
      console.error('❌ ===== SIGNALR CONNECTION CLOSED =====');
      setIsConnected(false);
      if (error) {
        setConnectionError(error.message);
      } else {
        setConnectionError('Connection closed');
      }
    });

    console.log('🚀 Starting SignalR connection...');
    
    connection.start()
      .then(() => {
        console.log('✅ ===== SIGNALR CONNECTED SUCCESSFULLY =====');
        setIsConnected(true);
        setConnectionError(null);
      })
      .catch((err) => {
        console.error('❌ ===== SIGNALR CONNECTION FAILED =====');
        setIsConnected(false);
        setConnectionError(err.message);
      });

    return () => {
      console.log('🧹 Cleaning up SignalR connection...');
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        setIsConnected(false);
      }
    };
  }, [isAuthenticated, user, showToast]);

  return {
    isConnected,
    connectionError,
    lastNotification,
    reconnectCount,
  };
};