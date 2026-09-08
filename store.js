/**
 * NairaFlow Fintech Dashboard — store.js
 * 
 * A centralized state management system using the Store (Pub/Sub) pattern.
 * This introduces students to the concepts behind Redux and useReducer.
 */

export class Store {
  #state;
  #listeners = [];

  constructor(initialState) {
    // Deep clone to prevent mutating the original initial state object
    this.#state = structuredClone(initialState);
  }

  /**
   * Returns a read-only copy of the current state.
   */
  getState() {
    return structuredClone(this.#state);
  }

  /**
   * Subscribes a listener function to state changes.
   * Returns an unsubscribe function.
   */
  subscribe(listenerFn) {
    this.#listeners.push(listenerFn);
    return () => {
      this.#listeners = this.#listeners.filter(l => l !== listenerFn);
    };
  }

  /**
   * Dispatches an action to update the state.
   * @param {Object} action - Must have a 'type' property, and optionally a 'payload'.
   */
  dispatch(action) {
    // Calculate the new state
    this.#state = this.#reduce(this.#state, action);
    
    // Notify all listeners
    this.#listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * The pure function that determines how state changes based on actions.
   */
  #reduce(state, action) {
    switch (action.type) {
      case 'SET_TRANSACTIONS':
        return { ...state, transactions: action.payload };
        
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
        
      case 'UPDATE_BALANCE':
        return { ...state, balance: state.balance + action.payload };
        
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        };
        
      case 'TOGGLE_SAVINGS_LOCK': {
        const newSavings = state.savings.map(plan => {
          if (plan.id === action.payload) {
            return { ...plan, locked: !plan.locked };
          }
          return plan;
        });
        return { ...state, savings: newSavings };
      }
      
      case 'SET_RATES':
        return { ...state, rates: action.payload };
        
      default:
        console.warn(`Unknown action type: ${action.type}`);
        return state;
    }
  }
}
