import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__wrapper-heading">
                <h3 className="not-found__heading">404</h3>
                <p className="not-found__subheading">Ой, Вы нашли страницу, которая не&nbsp;существует</p>
            </div>
            <blockquote
                className="not-found__text">
                <p>
                    что бы вернуться нажмите здесь
                </p>
            </blockquote>
            <Link className="not-found__link" to='/' replace>На главную страницу</Link>
        </div>
    );
};