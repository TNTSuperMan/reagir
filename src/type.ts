export type VNode<N extends Node | undefined, T extends FreeVNode[]> = {
    node: N
    children: T
    vars: object[]
}
export type FreeVNode = VNode<Node | undefined, FreeVNode[]>;
export type Component<P extends object, N extends Node | undefined, C extends FreeVNode[]> = (props: P) => VNode<N,C>;