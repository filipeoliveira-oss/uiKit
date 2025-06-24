'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";
import DataTable from "@/uiKit/components/dataTable/dataTable";
import Link from "next/link";

export default function DataTablePage() {

    const a = 
    `npx fouikit
components
Data table`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "ag-grid-react", url: "https://www.npmjs.com/package/ag-grid-react" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ] 
    return (
        <PageWrapper requirements={deps} title="Data Table">
            <ColorText text="Data Table"/>
            <span>This is a boiler plate of <Link href={'https://www.ag-grid.com/react-data-grid/getting-started/'} className="underline text-zinc-300">React AG Grid</Link>. All the creation process should be assigned to them</span>

            <CodeBlock code={a} />

            <div className="w-full h-96">
                <DataTable columnDefs={[{ field: 'name', filter: true, flex: 1, floatingFilter: true, headerName: 'Field 1', resizable: false }, { field: 'age', filter: true, flex: 1, floatingFilter: true, headerName: 'Field 2', resizable: false }]} rowData={[{ name: 'Filipe', age: 25 }]} />
            </div>
            
            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">rowData*</span>
                <CodeBlock code="Array<any>" showLineNumbers={false} />
                <span>Data that will be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">columnDefs*</span>
                <CodeBlock code="Array<DataTableColumnDefinition>" showLineNumbers={false} />
                <span>How the data will be displayed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">All others</span>
                <span>For all other parameters please refer to <Link href={'https://www.ag-grid.com/react-data-grid/getting-started/'} className="underline text-zinc-300">React AG Grid</Link> webpage</span>
            </div>
        </PageWrapper>
    )
}