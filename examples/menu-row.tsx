import { MenuRow } from '../components/menu-row';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><MenuRow label="Current conversation" sublabel="Ready to review" active className="min-h-11" /></div></div>;
}
