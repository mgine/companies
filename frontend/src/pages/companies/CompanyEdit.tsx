import axios from 'axios';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import { useParams } from 'react-router-dom';
import Status from "../../components/Status";
import ReactDatePicker from "react-datepicker";
import moment from 'moment';

const CompanyEdit = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date());
    const [status, setStatus] = useState('');

    const [redirect, setRedirect] = useState(false);
    let params = useParams();

    useEffect(() => {
        (
            async () => {

                const {data} = await axios.get(`companies/${params.id}`);
                setName(data.name);
                setAddress(data.address);
                setCreatedAt(new Date('20'+data.created_at));
                setStatus(data.status);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        let created_at = moment(createdAt).format("YY-MM-DD H:mm:ss");

        await axios.put(`companies/${params.id}`, {
            name,
            address,
            created_at,
            status
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/companies"/>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input className="form-control"
                           defaultValue={name}
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input className="form-control"
                           defaultValue={address}
                           onChange={e => setAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>CreatedAt</label>
                    <ReactDatePicker
                        selected={createdAt}
                        onChange={(date:Date) => setCreatedAt(date)} //only when value has changed
                        showTimeSelect dateFormat="yy-MM-dd H:mm"
                    />
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <Status status={status} statusChanged={setStatus} />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default CompanyEdit;
