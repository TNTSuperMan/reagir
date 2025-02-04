import { fragment, seg, t, usePrimitive, useObject, hook } from "../src";

const Comp = () => {
    const text = usePrimitive("");
    const list = useObject<string[]>([]);
    return seg.div({
        id: "vue"
    },{},
        seg.input({},{
            change(e){
                text.value = (e.target as HTMLInputElement).value;
            }
        }),
        seg.button({},{
            click(){
                list.push(text.value);
            }
        }, t("push")),
        fragment(()=>list.map(e=>t(e)))
    )
}
document.body.appendChild(Comp()[0])