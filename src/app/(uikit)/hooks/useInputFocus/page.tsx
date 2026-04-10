import PageComponent from "@/components/componentsPage"

export default function useDocumentTitlePage() {

    const codePreview = 
`const inputRef = useRef<HTMLInputElement>(null);
const isFocused = useInputFocus(inputRef);

//...
<input ref={inputRef}/>
`

    const code = 
`import { useState, useEffect } from "react";

const useInputFocus = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, [inputRef]);

  return isFocused;
};

export default useInputFocus;`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useInputFocus"
            componentName="useInputFocus"
            description="Um hook que alerta caso o input esteja focado."
            props={[
                {propName:'inputRef', type:'HTMLInputElement', default:'-', description:'Input a ser observado', required:true},
            ]}
            previewCode={codePreview}
        />        
    )
}