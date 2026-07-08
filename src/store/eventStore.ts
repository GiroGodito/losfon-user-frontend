// src/store/eventStore.ts
type EventCallback = (data: any) => void;

class EventStore {
  private listeners: Map<string, EventCallback[]> = new Map();

  subscribe(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      console.log(`📢 Emitting event "${event}" with data:`, data);
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`❌ Error in event handler for "${event}":`, error);
        }
      });
    } else {
      console.log(`📢 Event "${event}" emitted but no listeners`);
    }
  }

  clear(event: string) {
    this.listeners.delete(event);
  }

  clearAll() {
    this.listeners.clear();
  }
}

export const eventStore = new EventStore();