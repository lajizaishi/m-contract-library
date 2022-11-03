import React from 'react';

import {CATEGORY_NAVBAR} from "../../../pages/api";
import {Button,message} from 'antd'

function SignOutButton (){
    const getData = async () => {
        console.log('1111111111')
        const res = await CATEGORY_NAVBAR()
        console.log(res)
    }
    return(<>
        <Button
            type="button"
        >
            登出
        </Button>
        <Button onClick={()=>{getData()}}>请求</Button>
    </>)
}


export default SignOutButton;
