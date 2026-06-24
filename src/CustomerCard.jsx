import react from "react";

const CustomerCard = ({ customer, warna }) => {
    return (
        <div style={{border: "1px solid #ccc", padding: "10px", margin: "5px", backgroundColor: warna }}>
           <h3>{customer.name}</h3>
           <p>Email: {customer.email}</p> 
        </div>
    );
};

export default CustomerCard;