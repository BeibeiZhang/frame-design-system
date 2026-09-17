import { Info } from 'lucide-react';
import { EmptyState } from '../components/empty-state';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><EmptyState icon={Info} title="No results yet" description="Results will appear after your first request." /></div></div>;
}
