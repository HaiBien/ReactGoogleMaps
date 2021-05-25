import React from 'react';
import {WardType} from './MapConstants'
import './Map.scss'
import {Card} from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons'

function WardComponent(...props) {

    return (
        <></>
        // <div className='ward-cp site-card-border-less-wrapper'>
        //     <Card bordered={true}>
        //         {WardType && WardType.map((item, key) => {
        //             return (
        //                 <p key={key}>
        //                     <input type='checkbox'/> {item.name}
        //                 </p>
        //             )
        //         })}
        //     </Card>
        // </div>
    );
}

export default React.memo(WardComponent)