export function ConditionalClass({ danger }: { danger: boolean }) {
  return <div className={danger ? 'text-red-500' : 'type-detail'}>Conditional class</div>;
}
