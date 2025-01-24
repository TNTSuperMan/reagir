import { hook } from "../react/hook";
import type { FragmentNode, FreeVNode, VNode } from "../type";

type SEGCallback = (
    attrs: {[key: string]: string | (()=>string)},
    on: {
        [key in keyof HTMLElementEventMap]?: 
        (e: HTMLElementEventMap[key]) => void
    },
    ...children: (FreeVNode | FragmentNode)[]) => VNode<HTMLElement>

export const seg: {[key: string]: SEGCallback} = new Proxy({},{
    get(_, prop){
        if(typeof prop == "string"){
            const callback: SEGCallback = (attrs, on, ...children) => {
                const el = document.createElement(prop);
                const vnode: VNode<HTMLElement> = {
                    node: el,
                    children: [],
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
                let i = 0;
                children.forEach(e=>{
                    if(typeof e == "function"){

                    }else{
                        el.appendChild(e.node);
                        i++;
                    }
                })
                return vnode;
            }
            return callback
        }
    }
})
