import { StepIndicator } from '../components/step-indicator';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><div className="flex items-center gap-2"><StepIndicator status="done" /><span>Draft reviewed</span></div></div></div>;
}
