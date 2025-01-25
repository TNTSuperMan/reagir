import { fragment, seg, t, usePrimitive, fnode } from "../src";

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
        }, t("count:"), t(()=>count.value.toString())),
        fragment(()=>[
            fnode("one",()=>t("Least")),
            fnode("two",()=>t("Signed")),
            fnode("three",()=>t("Radix")),
        ])
    )
}
document.body.appendChild(Comp().node)