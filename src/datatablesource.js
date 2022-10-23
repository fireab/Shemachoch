
export const userColumns = [
  { field: "CN", headerName: "Cupon No", width: 110 },
  {
    field: "user",
    headerName: "User",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="" />
          {params.row.first_name} &nbsp;  
          {params.row.middle_name} &#160;
          {params.row.last_name}

        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 160,
  },

  {
    field: "phone_number",
    headerName: "Phone",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data


export const productColumns = [
  { field: "productID", headerName: "ID", width: 65 },
  {
    field: "image",
    headerName: "Product",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="" />
          {params.row.product}
        </div>
      );
    },
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 120,
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,
  },
  {
    field: "limit",
    headerName: "Limit per fam",
    width: 110,
  },
  {
    field: "unit_amount",
    headerName: "Unit Amount",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.unit_amount} &nbsp;
          {params.row.metric}
           
        </div>
      );
    },
  },

  {
    field: "unit_price",
    headerName: "Unit Price",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.unit_price} .00 Birr
           
        </div>
      );
    },
  },
  {
    field: "total_amount",
    headerName: "TotalAmount",
    width: 120, 
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.total_amount} &nbsp;
          {/* {params.row.metric} */}
           
        </div>
      );
    },  
  },
  {
    field: "total_price",
    headerName: "Total Price",
    width: 160, 
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.total_price} .00 Birr
           
        </div>
      );
    },  
  },
   
];


export const orderColumns = [
  { field: "orderID", headerName: "ID", width: 110 },
  {
    field: "CN",
    headerName: "Cupon number",
    width: 80,
  },

  {
    field: "full_name",
    headerName: "Full Name",
    width: 160,
  },

  {
    field: "total_price",
    headerName: "Price",
    width: 90,   
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  }
   
];



//temporary data

