import { hook } from "../react/hook";
import type { VNode } from "../type";
import { isString } from "../utils";

export const t = (text: string | (()=>string)): VNode<Text> => {
    if(isString(text)){
        return [new Text(text), [], []]
    }else{
        const node = new Text();
        hook(text, t=>
            node.textContent = t)
        return [node, [], []]
    }
}