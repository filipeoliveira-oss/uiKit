// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";

// export default function UiKitLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en">
//             <body className={`h-dvh w-dvw antialiased bg-background relative flex justify-center flex-col items-center  overflow-hidden `}>
//                 <div className="w-[50vh] h-1/2 bg-gradient-to-tr from-[#aa4b6b] via-bg-[#6b6b83] to-[#3b8d99] absolute top-[10%] right-8 rounded-full blur-[120px] opacity-40"></div>
//                 <div className="w-[50vh] h-1/2 bg-gradient-to-tr from-[#a8ff78] to-[#78ffd6] absolute bottom-[10%] left-8 rounded-full blur-[120px] opacity-30"></div>
//                 <Header/>

//                 <div className="w-[80%] h-[92%] backdrop-blur-lg text-white  flex flex-row ">
//                     <Sidebar/>
//                     <div className="w-full h-full pl-8  prose text-white!">
//                         {children}
//                     </div>
//                 </div>
//             </body>
//         </html>
//     );
// }
