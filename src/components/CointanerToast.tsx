'use client'

import { useTheme } from "next-themes"
import { ToastContainer } from "react-toastify"

export default function ContainerTost(){
    const {theme,} = useTheme()

    return(
        <ToastContainer autoClose={3000} closeOnClick theme={theme}/>
    )
}