import ComponentsLibrary from "@/components/componentsLibrary";
import { utilitiesList } from "@/lib/uiKitElements";


export default function Utilities() {
    return (
        <>
            <ComponentsLibrary data={utilitiesList} category="Utilitários"/>
        </>
    )
}