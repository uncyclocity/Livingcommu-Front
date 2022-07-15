import React from "react";
import SideContainer from "../components/Side/container";

type TSideLayout = {children: React.ReactNode}

export default function SideLayout({children}: TSideLayout) {
    return (
        <>
            <SideContainer/>
            {children}
        </>
    )
}