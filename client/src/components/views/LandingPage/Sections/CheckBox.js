import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function CheckBox() {
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header with arrow icon" key="1">
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
