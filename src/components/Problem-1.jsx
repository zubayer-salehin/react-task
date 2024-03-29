import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || status.trim() === '') {
            return;
        }
        const newTask = { name, status };
        setTasks([...tasks, newTask]);
        setName('');
        setStatus('');
    };

    const filteredTasks = tasks.filter(task => {
        if (show === 'active') {
            return task.status === 'Active';
        } else if (show === 'completed') {
            return task.status === 'Completed';
        }
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        const order = {
            Active: 1,
            Completed: 2
        };
        return (order[a.status] || 10) - (order[b.status] || 10);
    });

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                name="status"
                                value={status}
                                onChange={handleStatusChange}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => setShow('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => setShow('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => setShow('completed')}>Completed</button>
                        </li>
                    </ul>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
