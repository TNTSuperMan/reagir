import { hook } from "../react/hook";
import type { VNode } from "../type";

export const t = (text: string | (()=>string)): VNode<Text> => {
    if(typeof text == "string"){
        return [new Text(text), [], []]
    }else{
        const node = new Text();
        hook(text, t=>
            node.textContent = t)
        return [node, [], []]
    }
}