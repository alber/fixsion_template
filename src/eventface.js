//events.js

function buildEvent(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  return event;
}

function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
  }
  
  function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
  }
  
  function emit(eventName, data) {
    //const event = new CustomEvent(eventName, { detail: data });
    const event = buildEvent(eventName, data);
    document.dispatchEvent(event);
  }
  
  export { buildEvent, emit, subscribe, unsubscribe};