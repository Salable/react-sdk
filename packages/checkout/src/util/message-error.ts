type ReceiverType = 'client' | 'developer';

export class FrameError {
  message: string;
  description?: string;
  receiver: ReceiverType;

  constructor(message: string, receiver: ReceiverType, description?: string) {
    this.message = message;
    this.receiver = receiver;
    this.description = description;
  }
}
