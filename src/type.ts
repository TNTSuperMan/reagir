export type VNode<N extends Node | undefined> = {
    node: N
    children: FreeVNode[]
    vars: object[]
}
export type FreeVNode = VNode<Node | undefined>;
export type Component<P extends object, N extends Node | undefined> = (props: P) => VNode<N>;