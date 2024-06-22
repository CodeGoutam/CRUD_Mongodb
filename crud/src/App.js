import './App.css';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [name, setname] = useState({ fname: '', lname: '' });
    const [data, setdata] = useState();
    const [delName, setDel] = useState("")
    const [newname, setnewname] = useState({ existing: '', newfname: '', newlname: '' });
    async function create(e) {
        e.preventDefault()
        let res = await fetch("http://localhost:5000/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname: name.fname,
                lname: name.lname
            })
        })
        setname({ fname: "", lname: "" })
        if (res === "Data Added") {
            alert("Congrats submited")
        }
    }
    async function read() {
        await fetch("http://localhost:5000/read", {
            method: 'POST',
        })
            .then(async (res) => {
                res = await res.json();
                setdata(res)
                // console.log(res);
            })
    }
    //read operation
    useEffect(() => {
        read()
    }, [data]);

    // update operation
    async function update(e) {
        e.preventDefault()
        let res = await fetch("http://localhost:5000/update", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                existing: newname.existing,
                fname: newname.newfname,
                lname: newname.newlname
            })
        })
        setnewname({ existing: '', newfname: '', newlname: '' })
        res = await res.text()
        alert(res)
    }



    //delete operation
    async function del(e) {
        e.preventDefault();
        let res = await fetch("http://localhost:5000/delete", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                delName: delName,
            })
        })
        setDel("")
        res = await res.text()
        alert(res)
    }
    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="row">
                {/* Create */}
                <div className="col-md-3">
                    <h1>Create</h1>
                    <form method='POST' onSubmit={create}>
                        <div className="mb-3">
                            <label className="form-label">FirstName:</label>
                            <input
                                type="text"
                                name='fname'
                                className="form-control"
                                value={name.fname}
                                onChange={(e) => setname({ ...name, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">LastName:</label>
                            <input
                                type="text"
                                name='lname'
                                className="form-control"
                                value={name.lname}
                                onChange={(e) => setname({ ...name, [e.target.name]: e.target.value })}
                                required
                            />
                        </div>
                        <button type='submit' className="btn btn-primary">Create</button>
                    </form>
                </div>
                {/* Read */}
                <div className="col-md-3">
                    <h1>Read</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data != null ? data.map((res, index) => (
                                <tr key={index}>
                                    <td>{res.fname}</td>
                                    <td>{res.lname}</td>
                                </tr>
                            )) : <tr><td colSpan="2">No Data</td></tr>}
                        </tbody>
                    </table>
                </div>
                {/* Update */}
                <div className="col-md-3">
                    <h1>Update</h1>
                    <form method='POST' onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Existing Name:</label>
                            <input
                                type='text'
                                placeholder='Ram Sharma'
                                name='existing'
                                className="form-control"
                                value={newname.existing}
                                onChange={(e) => setnewname({ ...newname, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">First-Name:</label>
                            <input
                                type='text'
                                name='newfname'
                                className="form-control"
                                value={newname.newfname}
                                onChange={(e) => setnewname({ ...newname, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last-Name:</label>
                            <input
                                type='text'
                                name='newlname'
                                className="form-control"
                                value={newname.newlname}
                                onChange={(e) => setnewname({ ...newname, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <button type='submit' className="btn btn-primary">Update</button>
                    </form>
                </div>
                {/* Delete */}
                <div className="col-md-3">
                    <h1>Delete</h1>
                    <form onSubmit={del} method='POST'>
                        <div className="mb-3">
                            <label className="form-label">Existing Name:</label>
                            <input
                                type='text'
                                placeholder='Ram Sharma'
                                className="form-control"
                                value={delName}
                                onChange={(e) => setDel(e.target.value)}
                            />
                        </div>
                        <button type='submit' className="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
