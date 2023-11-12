import { FaArrowRight } from "react-icons/fa";

const Data = ({ searched, response, qnumber, jsonData, status}) => {


  return (
    <div className='Data'>
      <table className="Response-table">
        <tr>
          <td colSpan={2}><span>Last Query : <span className="Searched"> {searched} </span> </span>
          </td>
        </tr>
        <tr>
          <td><span>Response   : <span className="Response" style={{color : status===200 ? '#00FF00':'red'}}> {response} </span> </span></td>
          <td><span>Total Queries   : <span className="Response"> {qnumber} </span> </span></td>
          <td> <button onClick={()=>{window.location.reload()}}>Go Back <FaArrowRight /></button></td>
        </tr>
      </table>
      <div className="Result">
        <table border="1">
          <thead>
            <th>Sl No.</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price / Unit </th>
            <th>Ordered </th>
            <th>Stocks</th>
          </thead>
          <tbody>
            {jsonData ? (
              jsonData.map((item , index) => (
                <tr key={index}>
                  <td align="right">{index + 1}</td>
                  <td align="right">{item.productID}</td>
                  <td>{item.productName}</td>
                  <td align="right">{item.unitPrice}</td>
                  <td align="right">{item.unitsOnOrder}</td>
                  <td align="right">{item.unitsInStock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center"> No Result Found </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Data;