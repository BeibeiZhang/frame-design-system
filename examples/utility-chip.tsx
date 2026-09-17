import { UtilityChip } from '../components/utility-chip';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><UtilityChip className="min-h-11" ariaPressed={true}>Local context</UtilityChip></div></div>;
}
