export type WatchInfo<T = any> = ({
    mode: "component",
    vars: object[]
} | {
    mode: "watchFn",
    token: symbol,
    effect: (e: T) => void,
    target: () => T
})
export const WatchingInfos: WatchInfo[] = [];
export const last = (): WatchInfo | undefined => WatchingInfos[WatchingInfos.length-1]

export const watchVarDefines = (callback: ()=>void) => {
    WatchingInfos.push({
        mode: "component",
        vars: []
    })
    callback();
    const res = WatchingInfos.pop();
    if(res?.mode == "component"){
        return res.vars;
    }else{
        throw new Error("Cannot pop component watch state")
    }
}
