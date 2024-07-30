import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import myImage from '../assets/text.png';
import tanu from '../assets/tanu sad.png'

function Error(){
    return (
        <>
            <div className="four-page">
                <h1>4</h1>
                <img src={tanu}/>
                <h1>4</h1>
            </div>
            
        </>
    )
}

export default Error;