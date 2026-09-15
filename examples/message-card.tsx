import { MessageCard } from '../components/message-card';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><MessageCard title="Saved" body="Your draft is ready to review." tone="success" /></div>;
}
