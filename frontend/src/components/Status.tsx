import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Status as StatusModel} from "../models/status";

const Status = (props: {
    status: string,
    statusChanged: (status: string) => void
}) => {

    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('company/statuses');

                let inArray = !props.status.length || false;
                data.forEach((r: StatusModel) => {
                    if(r.name == props.status){
                        inArray = true;
                    }
                });

                if(!inArray){
                    props.statusChanged('');
                }
                setStatuses(data);
            }
        )()
    }, []);

    return (
        <select className="form-control" value={props.status} onChange={e => props.statusChanged(e.target.value)}>
            <option key="" value="" >choose</option>
            {statuses.map((r: StatusModel) => {
                return (
                    <option key={r.name} value={r.name}>{r.name}</option>
                )
            })}
        </select>
    );
};

export default Status;
