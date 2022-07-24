import React from 'react';

const Wrapper = (props: any) => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <main className="col-md-12 ms-sm-auto col-lg-12 px-md-12">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Wrapper;
