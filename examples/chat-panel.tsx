import { ChatPanel } from '../components/chat-panel';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><ChatPanel messages={<p>A conversation starts here.</p>} input={<input aria-label="Message" />} /></div>;
}
