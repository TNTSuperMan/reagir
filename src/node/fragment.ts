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
        let currentNode: ChildNode = entry;
        const iterate = (count: number) => {
            let current: ChildNode = entry;
            for(let i = 0;i < count;i++)
                if(current.nextSibling) current = current.nextSibling
            return current;
        }
        let oldcount = before.length;
        fnodes.forEach((e,i)=>{
            const k = before.findIndex((t,j)=>i<j&&t===e.key);
            if(k != -1){
                el.replaceChild(currentNode, iterate(k - i));
                oldcount--;
            }else{
                console.log(currentNode)
                el.insertBefore(currentNode, e.node().node);
            }
        })
        for(let i = 0;i < oldcount;i++){
            currentNode = entry;
            iterate(before.length + fnodes.length - i).remove();
        }
    })
}