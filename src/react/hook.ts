import { proxies } from "./use";
import { WatchingInfos, WatchMode, type WatchInfo } from "./watch";

export const rehookByFunc = <T>(token: {}, target: ()=>T, effect: (e: T)=>void) => {
    const watchinfo: WatchInfo<T> = [
        WatchMode.watchFn,
        token,
        target,
        effect
    ]
    WatchingInfos.push(watchinfo)
    const td = target();
    WatchingInfos.pop();
    effect(td);
}
const hookByFunc = <T>(target: ()=>T, effect: (e: T)=>void) =>
    rehookByFunc({}, target, effect);
const hookByObject = <T extends object>(target: T, effect: (e: T)=>void) =>
    proxies.get(target)?.(()=>effect(target));

export function hook<T>(target: ()=>T, effect: (e: T)=>void): void;
export function hook<T extends object>(target: T, effect: (e: T)=>void): void;
export function hook<T, O extends object>(target: (()=>T) | O, effect: (e: T | O)=>void){
    if(typeof target == "object")
        hookByObject(target, effect);
    else
        hookByFunc(target, effect);
}
