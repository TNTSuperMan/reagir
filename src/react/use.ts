import { rehookByFunc } from "./hook";
import { last, WatchMode } from "./watch";

export const proxies: WeakMap<object, 
    (effect: ()=>void)=>void> = new WeakMap;

export const useObject = <T extends object>(target: T): T => {
    const forcedDeps: Function[] = [];//target, callback
    let deps: [PropertyKey, {}, ()=>unknown, (e:unknown)=>void][] = [];
    const proxy = new Proxy(target, {
        get(t, p, r){
            const l = last();
            if(l?.[0] == WatchMode.watchFn)
                deps.push([p, l[1], l[2], l[3]])
            return Reflect.get(t, p, r);
        },
        set(t, p, v, r){
            const setres = Reflect.set(t, p, v, r);
            if(deps.some(e=>e[0] == p)){
                const tokens = new Set(deps.filter(e=>e[0] == p).map(e=>e[1]));
                tokens.forEach(e=>{
                    const hookdata = deps.find(t=>e==t[1]);
                    deps = deps.filter(t=>e!=t[1]);
                    if(hookdata) rehookByFunc(hookdata[1], hookdata[2], hookdata[3]);
                })
            }
            return setres;
        }
    })
    proxies.set(proxy, effect=>{
        forcedDeps.push(effect);
    });
    const l = last();
    if(l?.[0] == WatchMode.component) l[1].push(proxy);
    return proxy;
}

export const usePrimitive = <T>(target: T): {value: T} =>
    useObject({value: target});
