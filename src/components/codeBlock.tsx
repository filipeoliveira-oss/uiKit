import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({ language = 'bash', code, showLineNumbers=true }: {  language?: string, code:string, showLineNumbers?:boolean }) {

    return (
        <SyntaxHighlighter language={language} style={darcula} showLineNumbers={showLineNumbers} wrapLines={true} wrapLongLines={true}  customStyle={{flexShrink:0}}>
            {code}
        </SyntaxHighlighter>
    )
}