import { useState, useEffect } from "react";


const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [editIndex, setEditIndex] = useState(null);


    useEffect(() => {
        fetch("https://fakestoreapi.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);


    const handleAdd = () => {
        if (username && email && firstName && lastName && phone) {
            if (editIndex !== null) {
                const updatedUsers = [...users];
                updatedUsers[editIndex] = {
                    ...updatedUsers[editIndex],
                    username,
                    email,
                    name: { firstname: firstName, lastname: lastName },
                    phone,
                };
                setUsers(updatedUsers);
                setEditIndex(null);
            } else {
                const newUser = {
                    id: Date.now(),
                    username,
                    email,
                    name: { firstname: firstName, lastname: lastName },
                    phone,
                };
                setUsers([...users, newUser]);
            }
            resetForm();
        }
    };


    const resetForm = () => {
        setUsername("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhone("");
    };


    const handleEdit = (index) => {
        const user = users[index];
        setUsername(user.username);
        setEmail(user.email);
        setFirstName(user.name.firstname);
        setLastName(user.name.lastname);
        setPhone(user.phone);
        setEditIndex(index);
    };


    const handleDelete = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };


    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4">Manajemen Pengguna</h1>
            <div className="p-4 mb-4 border rounded shadow">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nama Depan"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Nama Belakang"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Nomor HP"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <button
                    onClick={handleAdd}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    {editIndex !== null ? "Update Pengguna" : "Tambah Pengguna"}
                </button>
            </div>
            <div>
                {users.map((user, index) => (
                    <div key={index} style={{ padding: "12px", border: "1px solid #ccc", marginBottom: "8px", borderRadius: "5px" }}>
                        <p style={{ fontWeight: "bold" }}>{user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Nama: {user.name.firstname} {user.name.lastname}</p>
                        <p>Nomor HP: {user.phone}</p>
                        <div style={{ marginTop: "8px" }}>
                            <button onClick={() => handleEdit(index)} style={{ marginRight: "5px", backgroundColor: "orange", color: "white", padding: "5px", border: "none" }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(index)} style={{ backgroundColor: "red", color: "white", padding: "5px", border: "none" }}>
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};


export default UserCRUD;
