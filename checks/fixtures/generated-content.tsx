export function GeneratedContent({ message }: { message: string }) {
  const simulatedReply = '😊 Generated message copy';
  return <article className="type-body text-text-primary">{message || simulatedReply}</article>;
}
