// CineWave Agent API

import { apiPost } from "@/utils/api_agent";
import { ChatResponse, CreateChat } from "@/types/agent";

// Agent

export async function createChat(
  createChat: CreateChat
): Promise<ChatResponse> {
  return apiPost<ChatResponse>("/agent/chat", createChat);
}
