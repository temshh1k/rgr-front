import s from './Header.module.css';
const Header = (props) =>{
    return(
        <header className={s.header}>
            <div className={s.categories}>
                <div className={s.item}>
                    <a>Мужское</a>
                </div>
                <div className={s.item}>
                    <a>Женское</a>
                </div >
                <div className={s.item}>
                    <a>Товары для дома</a>
                </div>

            </div>
            <div>
                <input placeholder='Найти...'/>
            </div>
        </header>
    )
}

export default Header;