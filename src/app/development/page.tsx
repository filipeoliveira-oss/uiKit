'use client'
import { BarLoader } from "@/uiKit/barLoader/barLoader";
import { BeatLoader } from "@/uiKit/beatLoader/beatLoader";
import { ClipLoader } from "@/uiKit/clipLoader/clipLoader";
import { DotLoader } from "@/uiKit/dotLoader/dotLoader";
import { FadeLoader } from "@/uiKit/fadeLoader/fadeLoader";
import { GridLoader } from "@/uiKit/gridLoader/gridLoader";
import { PropagateLoader } from "@/uiKit/propagateLoader/propagateLoader";
import { PuffLoader } from "@/uiKit/puffLoader/puffLoader";
import { PulseLoader } from "@/uiKit/pulseLoader/pulseLoader";
import { ScaleLoader } from "@/uiKit/scaleLoader/scaleLoader";

export default function Component(){
    return(
        <div className="w-full h-full">
            {/* <BarLoader/> */}
            {/* <BeatLoader/> */}
            {/* <ClipLoader/> */}
            {/* <DotLoader/> */}
            {/* <GridLoader/> */}
            {/* <FadeLoader/> */}
            {/* <PulseLoader/> */}
            {/* <PropagateLoader/> */}
            {/* <PuffLoader/> */}
            <ScaleLoader/>
        </div>
    )
}