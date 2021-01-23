import React, {useState} from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        //누른 것의 Index를 구하고
        const currentIndex = Checked.indexOf(value);//IndexOf는 js문법으로 배열에 있으면 현재 index 위치 반환, 없으면 -1 반환
        //전체 Checked된 State에서 현재 누른 CheckBox가 이미 있다면
        const newChecked = [...Checked]

        //State에 넣어준다
        if (currentIndex === -1) {
            newChecked.push(value)
            //빼주고
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)//부모 컴포넌트에 props로 보내줌.
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)} 
            checked={Checked.indexOf(value._id) === -1 ? false : true} />
            < span > {value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header with arrow icon" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
