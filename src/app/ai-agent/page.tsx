"use client";
import { useState } from "react";
import { createChat } from "@/lib/api_agent";
import { ChatMessage, CreateChat } from "@/types/agent";
import ReactMarkdown from "react-markdown";
import { BsSend } from "react-icons/bs";
import { user001 } from "@/data/exampleUser";
import { AGENT_ID, AGENT_NAME } from "@/data/agentDetails";

function TypingIndicator() {
  return (
    <div className="ai-agent-typing-indicator">
      {AGENT_NAME} is typing<span className="dot-anim">...</span>
    </div>
  );
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    const chatPayload: CreateChat = {
      user_message: input,
      agent_id: AGENT_ID,
      thread_id: threadId || undefined,
    };

    try {
      const res = await createChat(chatPayload);
      if (!res.messages) {
        throw new Error("Invalid response from agent API");
      }

      const assistantMessages = res.messages.filter(
        (msg) => msg.role === "assistant"
      );
      setMessages((msgs) => [...msgs, ...assistantMessages]);

      if (res.thread_id && !threadId) {
        setThreadId(res.thread_id);
      }
    } catch (err) {
      console.log(`Chat Error: ${err}`);
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-agent-chat">
      <div className="chat-history">
        {messages.map((msg) => (
          <div key={msg.content} className={`chat-msg chat-msg-${msg.role}`}>
            <b>{msg.role === "user" ? user001.fname : "CineAgent"}:</b>{" "}
            {msg.role === "assistant" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && <TypingIndicator />}
      </div>
      <form className="ai-agent-chat-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
          className="ai-agent-chat-input"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="ai-agent-chat-send-btn"
          aria-label="Send message"
        >
          <BsSend size={20} />
        </button>
      </form>
    </div>
  );
}
