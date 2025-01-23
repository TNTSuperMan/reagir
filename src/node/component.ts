import { watchVarDefines } from "../react/watch";
import type { Component, FreeVNode, VNode } from "../type";


export const createComponent = <P extends object, N extends Node | undefined, C extends FreeVNode[]>
        (component: Component<P,N,C>): ((props: P) => VNode<N,C>) => 
        (props) => {
    let vnode: VNode<N,C> | undefined;
    const vars = watchVarDefines(()=>vnode = component(props));
    if(!vnode) throw new Error("Cannot initialize component", {cause: component});
    const wrap_vnode: VNode<N,C> = {
        node: vnode.node,
        children: vnode.children,
        vars
    }
    return wrap_vnode;
}