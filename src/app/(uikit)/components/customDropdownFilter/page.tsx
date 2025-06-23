'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import CustomDropdownFilter from "@/uiKit/customDropdownFilterGrid/customDropdownFilterGrid";
import DataTable from "@/uiKit/dataTable/dataTable";

export default function CustomDropdownFilterAgGridPage() {

    const a = 
    `npx fouikit
components
Custom Dropdown Filter For AG Grid`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "ag-grid-react", url: "https://www.npmjs.com/package/ag-grid-react" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="Custom Dropdown">
            <h1 className="text-4xl font-bold">Currency inputs</h1>
            <span>This element MUST be used with the Data Table component</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <span>{`On DataTable component columnDefs, pass filter:CustomDropdownFilter and insert another property filterParams:{ options:['Custom 1', 'Custom 2']} with your custom options`}</span>

            <DataTable columnDefs={[{ field: '', filter: CustomDropdownFilter, flex: 1, floatingFilter: true, headerName: 'Custom filter', resizable: false, filterParams: { options: ['Custom 1', 'Custom 2'] } }]} rowData={[{}]} />
        </PageWrapper>
    )
}