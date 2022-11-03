import React, { Component } from 'react';
const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
class RegionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <div>
                    <img src='/地址.png/'/>
                </div>
            </>
        );
        }
    }

    export default RegionSelect;
