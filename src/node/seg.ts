import { hook } from "../react/hook";
import type { FragmentNode, FreeVNode, VNode } from "../type";
import { isFunction, isString } from "../utils";

type SEGCallback = (
    attrs: {[key: string]: string | (()=>string)},
    on: {
        [key in keyof HTMLElementEventMap]?: 
        (e: HTMLElementEventMap[key]) => void
    },
    ...children: (FreeVNode | FragmentNode)[]) => VNode<HTMLElement>

export const seg: {[key: string]: SEGCallback} = new Proxy({},{
    get(_, prop){
        if(isString(prop)){
            const callback: SEGCallback = (attrs, on, ...children) => {
                const el = document.createElement(prop);
                const vnode: VNode<HTMLElement> = [ el, [], [] ]
                Object.entries<string | (()=>string)>(attrs).forEach(e=>{
                    if(isString(e[1])){
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
                    if(isFunction(e)){
                        e(el);
                    }else{
                        el.appendChild(e[0]);
                        i++;
                    }
                })
                return vnode;
            }
            return callback
        }
    }
})
