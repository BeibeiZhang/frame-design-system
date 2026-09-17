import { Sparkles } from 'lucide-react';
import { IconBadge } from '../components/icon-badge';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><IconBadge><Sparkles size={20} /></IconBadge></div></div>;
}
