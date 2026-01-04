import "./area.css";
import { FiAlertTriangle } from "react-icons/fi";
import { Chat } from "./Chat";
export function Area() {
  return (
    <div className="chatbar">
      <div className="header">
        <h2 className="header1">Your intelligent cybersecurity companion..</h2>
      </div>
        <div className="chat-wrapper">
        <Chat />
      </div>
      <div className="notice">
        <p>
          <span className="notice2">
            <FiAlertTriangle className="alert" />
            Notice:
          </span>{" "}
          Only cybersecurity-related prompts are assisted here. This AI is specialized for cyber threat analysis, security protocols, and protection strategies.
        </p>
      </div>
    </div>
  );
}
