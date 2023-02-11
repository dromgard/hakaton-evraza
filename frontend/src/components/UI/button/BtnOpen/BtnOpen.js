import React from "react";
import './BtnOpen.css'

function BtnOpen({children, ...props}){

    return(
        <button {...props} className="btn-open"> {children} </button>
    );
};

export default BtnOpen