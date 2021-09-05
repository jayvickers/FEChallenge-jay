import React from 'react';
import { useEffect, useState } from 'react';

const DisplayTable = (): JSX.Element => {

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
    <div>Home</div>
  );
};

export default DisplayTable;
