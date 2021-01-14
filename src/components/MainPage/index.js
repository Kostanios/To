import React from 'react';

import style from './style.module.css';
import ShowList from '../ShowList';

const MainPage = () => <div className={style.mainContainer}>
        <header className={style.header}>todos</header>
        <ShowList/>
    </div>;

export default MainPage;
