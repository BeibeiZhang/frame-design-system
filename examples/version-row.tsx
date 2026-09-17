import { VersionRow } from '../components/version-row';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><VersionRow label="Local editor" current="1.0" latest="1.1" status="update-available" /></div></div>;
}
