import ComponentsLibrary from "@/components/componentsLibrary";
import { componentsList } from "@/lib/uiKitElements";

export default function ComponentsPage(){
    return(
        <div className="">
            <ComponentsLibrary data={componentsList} category="Componentes"/>
        </div>
    )
}