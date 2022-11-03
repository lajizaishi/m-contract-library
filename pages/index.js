import React, {Component} from "react";

import { AppWithAuthentication } from "../src/components/App";
import RegionSelect from '../src/components/regionSelect/regionSelect'

class IndexPage extends Component{
    componentDidMount() {
        const { onSetUsers } = this.props;
        document.documentElement.style.fontSize=document.documentElement.clientWidth/ 750*100 +"px";
    }
    render() {
        return(
            <>
                <AppWithAuthentication>
                    <div className={'top'}>
                        <RegionSelect/>
                        <h1 className={'index-tielt'}>找律师</h1>
                    </div>
                    <div className={'test'}></div>
                </AppWithAuthentication>
                <style global jsx>
                    {`
                    .top{
                        width:100%;
                        height:1.24rem
                    }
                    .index-tielt{
                        font-size: 0.36rem;
                        font-weight: 600;
                       height:1.24rem
                    }
                    .test{
                        width:6.7rem;
                        height:2rem;
                        background:red;
                        margin: 0 auto
                    }
                `}
                </style>
            </>
        )
    }
}
export default IndexPage;
