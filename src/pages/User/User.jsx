import React, { useState } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Select from '../../components/Select';

const User = () => {
    return (
        <div className="interface">
            <nav className="nav-container mb-small block">
                <div className="nav nav_user">
                    <Select text="Группа отчетов" addClass="interface__select" />
                    <Select text="Отчет" addClass="interface__select" />
                </div>
            </nav>
        </div>
    ); 
}

export default User;