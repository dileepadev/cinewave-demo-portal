export interface CreateChat {
  user_message: string;
  agent_id: string;
  thread_id: string | undefined;
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatResponse {
  messages: ChatMessage[];
  agent_id: string;
  thread_id: string;
}
