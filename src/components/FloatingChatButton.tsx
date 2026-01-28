"use client";
import AIAgentPage from "@/app/ai-agent/page";
import { useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { VscClose } from "react-icons/vsc";
import { MdFullscreen } from "react-icons/md";
import { AGENT_NAME } from "@/data/agentDetails";

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);

  return (
    <>
      <button
        type="button"
        className="floating-chat-btn"
        aria-label="Open Chat"
        onClick={() => setOpen((v) => !v)}
      >
        <FaRobot size={26} />
      </button>

      <div
        className={`chat-bubble-window ${maximized ? "maximized" : ""} ${
          open ? "open" : "closed"
        }`}
      >
        <div className="chat-bubble-header">
          <span>{AGENT_NAME}</span>
          <div>
            <button
              type="button"
              aria-label="Maximize Chat"
              onClick={() => setMaximized((v) => !v)}
              className="chat-bubble-action-icon"
            >
              <MdFullscreen />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Chat"
              className="chat-bubble-action-icon"
            >
              <VscClose />
            </button>
          </div>
        </div>
        <div className="chat-bubble-body">
          <AIAgentPage />
        </div>
      </div>
    </>
  );
}
