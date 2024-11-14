import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://authazure.azurewebsites.net/api/Auth';

function Login() {
    const [datas, setDatas] = useState({
        login: '',
        password: '',
    });
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas({
            ...datas,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/LoginUser`, datas);
            console.log(response.data);
            setUserInfo(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Ошибка авторизации!! Неправильный логин или пароль. Попробуйте ещё раз!');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Авторизация</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="login" className="form-label">Логин</label>
                                    <input
                                        type="text"
                                        name="login"
                                        id="login"
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
                                        id="password"
                                        className="form-control"
                                        value={datas.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">Авторизироваться</button>
                            </form>

                            {message && <p className="text-danger mt-3 text-center">{message}</p>}

                            {userInfo && (
                                <div className="mt-4 text-center">
                                    <h5>Welcom to the club, {userInfo.fullName}</h5>
                                    <img 
                                        src={userInfo.photoUrl} 
                                        alt="User" 
                                        width="250"
                                        className="img-fluid" 
                                        onError={() => setMessage("Не удалось загрузить аватарку")} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
