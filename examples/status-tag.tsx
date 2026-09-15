import { StatusTag } from '../components/status-tag';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><StatusTag variant="in-progress" label="Processing" /></div>;
}
