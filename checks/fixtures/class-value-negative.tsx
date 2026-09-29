export function ComparisonOperand({ kind }: { kind: string }) {
  return <div className={kind === 'text-red-500' ? 'type-detail' : 'type-body'}>Comparison operand</div>;
}
