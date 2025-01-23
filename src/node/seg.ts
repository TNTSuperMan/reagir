import { hook } from "../react/hook";
import type { FreeVNode, VNode } from "../type";

type SEGCallback = <C extends FreeVNode[]>(
    attrs: {[key: string]: string | (()=>string)},
    on: {
        [key in keyof HTMLElementEventMap]?: 
        (e: HTMLElementEventMap[key]) => void
    },
    ...children: C) => VNode<HTMLElement, C>

export const seg: {[key: string]: SEGCallback} = new Proxy({},{
    get(_, prop){
        if(typeof prop == "string"){
            const callback: SEGCallback = (attrs, on, ...children) => {
                const el = document.createElement(prop);
                const vnode: VNode<HTMLElement, typeof children> = {
                    node: el,
                    children: children,
                    vars: []
                }
                Object.entries<string | (()=>string)>(attrs).forEach(e=>{
                    if(typeof e[1] == "string"){
                        el.setAttribute(e[0], e[1]);
                    }else{
                        hook(e[1], t=>
                            el.setAttribute(e[0], t))
                    }
                })
                const on_: any = Object.entries(on);
                const _on: [string, ()=>void][] = on_;
                _on.forEach(e=>el.addEventListener(...e))
                children.forEach(e=>{
                    if(e.node)
                        el.appendChild(e.node)
                    else{
                        const mapper = (e: FreeVNode): Node[] => e.node ? [e.node] : e.children.map(e=>mapper(e)).flat();
                        el.append(...mapper(e))
                    }
                })
                return vnode;
            }
            return callback
        }
    }
})
