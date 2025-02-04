export type VNode<N extends Node> = [
    N,
    FreeVNode[],
    object[]
]
export type FreeVNode = VNode<Node>;
export type FragmentNode = (el: HTMLElement)=>void;
export type Component<P extends object, N extends Node> = (props: P) => VNode<N>;