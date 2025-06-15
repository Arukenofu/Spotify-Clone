export type ComponentPropsType<T> = T extends new (...args: any) => {

  $props: infer P

} ? NonNullable<P> : T extends (props: infer P, ...args: any) => any ? P : {}
