export function EscapedLocations() {
  return (
    <>
      <div className={'safe \
text-red-500'}>Line continuation</div>
      <div className={'safe\u0020font-medium'}>Unicode escape</div>
      <div className={`safe\u0020text-text-primary/60`}>Template escape</div>
      <div className="safe&amp; &#32;bg-blue-500">JSX entities</div>
      <div className={'text\x2dred-500'}>Escaped token</div>
    </>
  );
}
