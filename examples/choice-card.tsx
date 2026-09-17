import { Sparkles } from 'lucide-react';
import { ChoiceCard } from '../components/choice-card';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><ChoiceCard icon={<Sparkles size={20} />} title="Summarize" description="Create a brief overview." active /></div></div>;
}
