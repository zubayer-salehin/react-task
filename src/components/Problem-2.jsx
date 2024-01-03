import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Problem2 = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [ModalAData, setModalAData] = useState([]);
    const [ModalBData, setModalBData] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    const toggleModalA = () => {
        setShowModalB(false);
        setShowModalA(true);
        const params = new URLSearchParams(searchParams);
        params.set('modal', 'A');
        setSearchParams(params);
    };

    const toggleModalB = () => {
        setShowModalA(false);
        setShowModalB(true);
        const params = new URLSearchParams(searchParams);
        params.set('modal', 'B');
        setSearchParams(params);
    };

    const openModalC = (contact) => {
        setSelectedContact(contact);
        setShowModalC(true);
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
        setSearchParams('', '');
    };

    useEffect(() => {
        fetch("https://contact.mediusware.com/api/contacts/?format=json&page_size=12")
            .then(res => res.json())
            .then(data => setModalAData(data.results))
    }, [])

    useEffect(() => {
        fetch("https://contact.mediusware.com/api/country-contacts/United%20States/?page_size=12")
            .then(res => res.json())
            .then(data => setModalBData(data.results))
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={toggleModalA} style={{ color: '#46139f' }}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={toggleModalB} style={{ color: '#ff7f50' }}>US Contacts</button>
                </div>
            </div>

            {/* Modal A */}
            {showModalA && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal A</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {ModalAData
                                        .filter((contact) => !onlyEven || contact.id % 2 === 0)
                                        .map((contact) => (
                                            <li key={contact.id} onClick={() => openModalC(contact)}>{contact.phone} - {contact.country.name}</li>
                                        ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <label className="form-check-label me-3">
                                    <input type="checkbox" className="form-check-input" onChange={handleCheckboxChange} checked={onlyEven} />
                                    Only even
                                </label>
                                <button className="btn btn-md btn-outline-primary" onClick={toggleModalA} style={{ color: '#46139f' }}>Modal Button A</button>
                                <button className="btn btn-md btn-outline-warning" onClick={toggleModalB} style={{ color: '#ff7f50' }}>Modal Button B</button>
                                <button className="btn btn-primary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal B */}
            {showModalB && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal B</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {ModalBData
                                        .filter((contact) => !onlyEven || contact.id % 2 === 0)
                                        .map((contact) => (
                                            <li key={contact.id} onClick={() => openModalC(contact)}>{contact.phone} - {contact.country.name}</li>
                                        ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <label className="form-check-label me-3">
                                    <input type="checkbox" className="form-check-input" onChange={handleCheckboxChange} checked={onlyEven} />
                                    Only even
                                </label>
                                <button className="btn btn-md btn-outline-primary" onClick={toggleModalA} style={{ color: '#46139f' }}>Modal Button A</button>
                                <button className="btn btn-md btn-outline-warning" onClick={toggleModalB} style={{ color: '#ff7f50' }}>Modal Button B</button>
                                <button className="btn btn-primary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal C */}
            {showModalC && selectedContact && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ border: '1px solid #46139f' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Modal C</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalC(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Contact Details:</p>
                                <p>ID: {selectedContact.id}</p>
                                <p>Phone: {selectedContact.phone}</p>
                                <p>Country: {selectedContact.country.name}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => setShowModalC(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Problem2;
