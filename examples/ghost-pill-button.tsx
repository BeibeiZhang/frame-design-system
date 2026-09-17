import { GhostPillButton } from '../components/ghost-pill-button';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><GhostPillButton className="min-h-11" disabled>Save draft</GhostPillButton></div></div>;
}
