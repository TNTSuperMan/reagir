import { hook } from "../react/hook";
import type { FragmentNode, FreeVNode } from "../type";

export const fragment = (children: ()=>(()=>FreeVNode)[]): FragmentNode =>
        (el) => {
    let before: void[] = [];
    const entry = document.createComment("");
    el.appendChild(entry);
    console.log(el)
    hook(children, fnodes=>{
        before.forEach(()=>entry.nextSibling?.remove())
        entry.after(...(fnodes.map(e=>e()[0])))
        before = fnodes.map(e=>{})
    })
}