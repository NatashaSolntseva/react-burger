import styles from "./appHeaderStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useRouteMatch } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true }); //подкрашивает белым активные иконки, хук определяет где мы находимся
  const isFeed = !!useRouteMatch({ path: "/feed" });
  const isProfile = !!useRouteMatch({ path: "/profile" });

  const { userIsAuth, userName } = useAppSelector((store) => store.user);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav__menu_left}>
          <ul className={styles.header__list}>
            <li>
              <NavLink
                exact
                to="/"
                className={`pl-5 pr-5 ${styles.header__link}`}
                activeClassName={styles.header__link_active}
              >
                <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/feed"
                className={`pl-5 pr-5 ${styles.header__link}`}
                activeClassName={styles.header__link_active}
              >
                <ListIcon type={isFeed ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>
        <nav className={styles.nav__menu_right}>
          <ul className={styles.header__list}>
            <li>
              <NavLink
                to="/profile"
                className={`pl-5 pr-5 ${styles.header__link}`}
                activeClassName={styles.header__link_active}
              >
                <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">
                  {userIsAuth ? `Личный кабинет ${userName}` : "Личный кабинет"}
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
