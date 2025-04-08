declare global {
  interface SpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;
  }

  interface Window {
    SpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }
}

export {};
