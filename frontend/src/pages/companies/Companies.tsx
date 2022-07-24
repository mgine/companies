import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import {Company} from "../../models/company";
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";
import Status from "../../components/Status";
import { useSearchParams } from 'react-router-dom';

const Companies = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [lastPage, setLastPage] = useState(0);
    const [status, setStatus] = useState((searchParams.get('status') || ''));

    useEffect(() => {
        (
            async () => {

                let params : URLSearchParams = new  URLSearchParams();
                params.append("page", page.toString());

                let url = `companies?page=${page}`;

                if(status.length){
                    url += `&status=${status}`;
                    params.append("status", status);
                }

                const {data} = await axios.get(url);

                setSearchParams(params);

                setCompanies(data.data);
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page, status]);

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/companies/create" className="btn btn-sm btn-outline-secondary">Add</Link>


            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status
                            <Status status={status} statusChanged={setStatus} /></th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map((company: Company) => {
                        return (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.address}</td>
                                <td>{company.status}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/companies/${company.id}/edit`}
                                              className="btn btn-sm btn-outline-secondary">Edit</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    );
}

export default Companies;
