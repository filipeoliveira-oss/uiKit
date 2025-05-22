import React from "react";

export default function PageWrapper({children} : {children:React.ReactNode}){
    return(
        <div className="w-full h-full overflow-auto flex flex-col gap-8 pb-12">
            {children}
        </div>
    )
}