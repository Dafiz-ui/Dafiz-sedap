import react, { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";

const FunctionalCustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setCustomers([
            { id: 1, name: "Alice Johnson", email: "alice@example.com" },
            { id: 2, name: "Bob Williams", email: "bob@example.com" },
            { id: 3, name: "Ujang Johnson", email: "ujang@example.com" },
            { id: 4, name: "Ipul Williams", email: "Ipul@example.com" }
        ]);
    }, []);
return (
    <div>
        <h2>Customer List (Functional Component)</h2>
        {customers.map(customer => {
            const warna = customer.id % 2 === 0 ? "red" : "white";
            return (
                <CustomerCard key={customer.id} customer={customer} warna={warna}/>
            );
})}
    </div>
);
};

export default FunctionalCustomerList;