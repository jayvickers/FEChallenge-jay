
import React, { useEffect, useState } from 'react';
import DisplayTable from '../components/DisplayTable/DisplayTable';
import { Content } from 'carbon-components-react';

const TableContainer = () => {

    const getStuff = async () => {
        let response = await fetch(
            "https://patch-advisories-dev.mybluemix.net/api/v1/products?fmt=json"
        );

        let jsonStuff = await response.json();

        return jsonStuff;
    };

    useEffect(() => {
        getStuff().then((result) => {
            console.log(result.data);
            let vendorCtr: any = [];
            result.data.forEach((product: any) => {
                if (!vendorCtr.includes(product.vendor)) {
                    vendorCtr.push(product.vendor);
                }

            });
        });
    }, []);

    return (
        <Content id="main-content">
            <DisplayTable />
        </Content>
    )
}


export default TableContainer;