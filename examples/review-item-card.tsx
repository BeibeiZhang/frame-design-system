import { ReviewItemCard } from '../components/review-item-card';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><ReviewItemCard title="Draft summary" type="Document" time="Just now" interactive={false} /></div></div>;
}
