import ComponentsLibrary from "@/components/componentsLibrary";
import { loadersList } from "@/lib/uiKitElements";

export default function LoaderPage(){
    return(
        <div className="">
            <ComponentsLibrary data={loadersList} category="Loaders"/>
        </div>
    )
}