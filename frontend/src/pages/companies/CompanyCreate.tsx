import axios from 'axios';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import Status from "../../components/Status";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CompanyCreate = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date());
    const [status, setStatus] = useState('');

    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        let created_at = moment(createdAt).format("YY-MM-DD H:mm:ss");

        await axios.post('companies', {
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
                    <input className="form-control" onChange={e => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input className="form-control" onChange={e => setAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Created at</label>
                    <ReactDatePicker
                        selected={createdAt}
                        onChange={(date:Date) => setCreatedAt(date)} //only when value has changed
                        showTimeSelect dateFormat="yy-MM-dd H:mm"
                    />
                    {/*<input className="form-control" type="datetime-local" onChange={e => setCreatedAt(e.target.value)}/>*/}
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

export default CompanyCreate;
