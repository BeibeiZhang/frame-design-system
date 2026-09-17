import { Info } from 'lucide-react';
import { HeaderIconButton } from '../components/header-icon-button';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><HeaderIconButton ariaLabel="Conversation details" className="min-h-11 min-w-11" onClick={() => {}}><Info size={20} /></HeaderIconButton></div></div>;
}
