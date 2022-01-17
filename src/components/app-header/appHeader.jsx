import styles from "./appHeaderStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav__menu_left}>
          <button className={`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default pl-2">
              Конструктор
            </span>
          </button>
          <button className={`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive pl-2">
              Лента заказов
            </span>
          </button>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.nav__menu_right}>
          <button className={`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
