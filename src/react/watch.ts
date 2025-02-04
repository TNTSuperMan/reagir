export const enum WatchMode{
    component,
    watchFn
}

export type WatchInfo<T = any> = ({
    mode: WatchMode.component,
    vars: object[]
} | {
    mode: WatchMode.watchFn,
    token: symbol,
    effect: (e: T) => void,
    target: () => T
})
export const WatchingInfos: WatchInfo[] = [];
export const last = (): WatchInfo | undefined => WatchingInfos[WatchingInfos.length-1]

export const watchVarDefines = (callback: ()=>void) => {
    WatchingInfos.push({
        mode: WatchMode.component,
        vars: []
    })
    callback();
    const res = WatchingInfos.pop();
    if(res?.mode == WatchMode.component){
        return res.vars;
    }else{
        throw new Error("Cannot pop component watch state")
    }
}
