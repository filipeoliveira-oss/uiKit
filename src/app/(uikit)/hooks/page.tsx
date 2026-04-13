import ComponentsLibrary from "@/components/componentsLibrary";
import { hooksList } from "@/lib/uiKitElements";

export default function LoaderPage(){
    return(
        <div className="">
            <ComponentsLibrary data={hooksList} category="Hooks"/>
        </div>
    )
}