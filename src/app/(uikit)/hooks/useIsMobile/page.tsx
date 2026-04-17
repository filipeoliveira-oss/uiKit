import PageComponent from "@/components/componentsPage"

export default function useIsMobilePage() {

    const codePreview = 
`const isMobile = useIsMobile();`

    const code = 
`import { useEffect, useState } from "react";

export function useIsMobile(query = 768) {
  const maxWidth = '(max-width:' + String(query) +'px)'

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(maxWidth).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(maxWidth);

    const updateIsMobile = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initial check in case it changed before the effect ran
    setIsMobile(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateIsMobile);
    return () => mediaQueryList.removeEventListener("change", updateIsMobile);
  }, [maxWidth]);

  return isMobile;
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useIsMobile"
            componentName="useIsMobile"
            description="Um hook que verifica se a página é mobile (pode ser usado várias vezes para diferentes tamanhos de tela)."
            props={[
                {propName:'query ', type:'number', default:'768', description:'Tamanho de tela a ser observado', required:false},
            ]}
            previewCode={codePreview}
        />        
    )
}