import { hook } from "../react/hook";
import type { FragmentNode, FreeVNode } from "../type";

type FNode = {
    key: unknown,
    node: ()=>FreeVNode
}
export const fnode = (key: unknown, node: ()=>FreeVNode): FNode => ({
    key, node
})

export const fragment = (children: ()=>FNode[]): FragmentNode =>
        (el) => {
    let before: unknown[] = [];
    const entry = document.createComment("");
    el.appendChild(entry);
    console.log(el)
    hook(children, fnodes=>{
        before.forEach(()=>entry.nextSibling?.remove())
        entry.after(...(fnodes.map(e=>e.node().node)))
    })
}