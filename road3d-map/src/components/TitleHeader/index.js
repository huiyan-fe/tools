import React, {useState, useEffect} from 'react';
import {Input, Button} from 'antd';
import './index.less';

export default () => {
    const [showInput, setShowInput] = useState(false);
    const [header, setHeader] = useState(localStorage.getItem('title') || '标题');

    useEffect(() => {
        localStorage.setItem('title', header);
    }, [header]);

    return (
        <div className="title-header">
            <h1>{header}</h1>
            {showInput && <Input
                className="title-input"
                value={header}
                onChange={e => {setHeader(e.target.value);}}
                onPressEnter={() => {setShowInput(!showInput);}}
                onBlur={() => {setShowInput(!showInput);}}
            />}
            {!showInput && <Button
                className="title-btn"
                type="dashed"
                shape="circle"
                icon="edit"
                onClick={() => {setShowInput(!showInput);}}
            />}
        </div>
    );
};
