import { watchVarDefines } from "../react/watch";
import type { Component, FreeVNode, VNode } from "../type";


export const createComponent = <P extends object, N extends Node>
        (component: Component<P,N>): ((props: P) => VNode<N>) => 
        (props) => {
    let vnode: VNode<N> | undefined;
    const vars = watchVarDefines(()=>vnode = component(props));
    if(!vnode) throw new Error("Cannot initialize component", {cause: component});
    const wrap_vnode: VNode<N> = {
        node: vnode.node,
        children: vnode.children,
        vars
    }
    return wrap_vnode;
}