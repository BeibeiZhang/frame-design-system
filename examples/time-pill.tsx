import { TimePill } from '../components/time-pill';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><TimePill time="2 minutes" tooltip="Estimated review time" /></div></div>;
}
