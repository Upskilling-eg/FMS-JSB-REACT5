import React from 'react'
import noData from "../../../../assets/images/no-data.png";

export default function Nodata() {
  return (
    <div className=' text-center py-5'>
        <img src={noData} alt="" />
        <h5>No Data !</h5>
    </div>
  )
}
