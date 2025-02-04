export const enum WatchMode{
    component,
    watchFn
}

export type WatchInfo<T = any> = ([
    WatchMode.component,
    object[] //Vars
] | [
    WatchMode.watchFn,
    {},
    () => T, //Target
    (e: T) => void //Callback
])
export const WatchingInfos: WatchInfo[] = [];
export const last = (): WatchInfo | undefined => WatchingInfos[WatchingInfos.length-1]

export const watchVarDefines = (callback: ()=>void) => {
    WatchingInfos.push([WatchMode.component, []])
    callback();
    const res = WatchingInfos.pop();
    if(res?.[0] == WatchMode.component){
        return res[1];
    }else{
        throw new Error("Cannot pop component watch state")
    }
}
