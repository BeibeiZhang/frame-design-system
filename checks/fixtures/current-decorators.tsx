function registered(value: unknown) {
  return value;
}

function tracked(value: unknown, context: unknown) {
  return { value, context };
}

@registered
export class DecoratedCard {
  @tracked accessor label = 'Decorated';

  render() {
    return <div className="bg-red-500">{this.label}</div>;
  }
}
