// Minimal stand-in for H5P core's EventDispatcher (h5p-php-library/js/h5p-event-dispatcher.js),
// needed because content types extend `H5P.EventDispatcher`, which is normally provided by the
// H5P core runtime and is otherwise unavailable in the jsdom test environment.
class MockEventDispatcher {
  private listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

  on(type: string, listener: (...args: unknown[]) => void): void {
    (this.listeners[type] ??= []).push(listener);
  }

  off(type: string, listener?: (...args: unknown[]) => void): void {
    if (!this.listeners[type]) {
      return;
    }

    if (!listener) {
      delete this.listeners[type];
      return;
    }

    this.listeners[type] = this.listeners[type].filter((l) => l !== listener);
  }

  trigger(type: string, data?: unknown): void {
    this.listeners[type]?.forEach((listener) => listener(data));
  }
}

(window as unknown as { H5P: Record<string, unknown> }).H5P = {
  ...(window as unknown as { H5P?: Record<string, unknown> }).H5P,
  EventDispatcher: MockEventDispatcher,
};
