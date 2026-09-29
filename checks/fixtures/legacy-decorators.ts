function inject(target: object, property: string | symbol | undefined, parameterIndex: number) {
  return { target, property, parameterIndex };
}

export class LegacyService {
  constructor(@inject readonly dependency: string) {}
}
