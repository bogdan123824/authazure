import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://authazure.azurewebsites.net/api/Auth'; 

function Registration() {
    const [datas, setDatas] = useState({
        name: '',
        login: '',
        password: '',
        photo: null,
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas({
            ...datas,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setDatas({
            ...datas,
            photo: e.target.files[0], 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('Name', datas.name);
        data.append('Login', datas.login);
        data.append('Password', datas.password);
        data.append('photo', datas.photo);
    
        try {
            const response = await axios.post(`${API_URL}/RegistrationUser`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
    
            setMessage('Вы успешно зарегистрировались!');
            setMessageType('success'); 
        } catch (error) {
            setMessage("Ошибка! не удалось зарегистрироваться. Попробуйте ещё раз!");
            setMessageType('error'); 
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-light">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Регистрация</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label">Имя</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        value={datas.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="login" className="form-label">Логин</label>
                                    <input
                                        type="text"
                                        name="login"
                                        className="form-control"
                                        value={datas.login}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Пароль</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={datas.password}
                                        onChange={handleChange}                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="file"
                                        name="photo"
                                        className="form-control-file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">Зарегистрироваться</button>
                            </form>
                            {message && (
                                <p className={`mt-3 ${messageType === 'error' ? 'text-danger' : 'text-success'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
