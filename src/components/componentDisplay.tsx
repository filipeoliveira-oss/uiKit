export default function ComponentDisplay({children} : {children:React.ReactNode}) {
    return (
        <div className="w-full h-fit p-4 bg-white rounded-2xl">
            <div className="w-full h-fit">
                {children}
            </div>
        </div>
    )
}