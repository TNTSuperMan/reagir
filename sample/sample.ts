import { seg, t, usePrimitive } from "../src";

const Comp = () => {
    const count = usePrimitive(0);
    console.log(count)
    return seg.div({
        id: "vue"
    },{},
        t("hello"),
        seg.button({},{
            click(){
                count.value++;
            }
        }, t("count:"), t(()=>count.value.toString()))
    )
}
document.body.appendChild(Comp().node)