export default function ColorText({text} : {text:string}){
    return(
        <h1 className="text-4xl font-bold bg-gradient-to-br from-lighterteal to-reactblue bg-clip-text text-transparent capitalize">{text}</h1>
    )
}