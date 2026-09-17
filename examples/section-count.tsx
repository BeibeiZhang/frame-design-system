import { SectionCount } from '../components/section-count';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><SectionCount n={3} /></div></div>;
}
