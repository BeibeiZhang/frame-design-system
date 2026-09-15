import { ChatMessage } from '../components/chat-message';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><ChatMessage role="assistant" content="Here is a concise answer." /></div>;
}
