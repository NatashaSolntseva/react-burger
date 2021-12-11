import styles from "./AppHeaderStyles.module.css";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className = {styles.header}>
      <div className = {styles.container}>
        <nav className = {styles.nav__menu_left}>
          <a href="#" className = {`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type = "primary" />
            <p className = "text text_type_main-default pl-2">
              Конструктор
            </p>
          </a>
          <a href="#" className = {`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <ListIcon type = "secondary" />
            <p className = "text text_type_main-default text_color_inactive pl-2">
              Лента заказов
            </p>
          </a>
        </nav>
        <a href="#" className = {styles.logo}>
          <Logo />
        </a>
        <nav className = {styles.nav__menu_right}>
          <a href="#" className = {`${styles.menu_btn} pt-4 pb-4 pl-5 pr-5`}>
            <ProfileIcon type = "secondary" />
            <p className = "text text_type_main-default text_color_inactive pl-2"> 
              Личный кабинет
            </p>
          </a>
        </nav>
      </div>
    </header>
  );
}

//pl не примиксовывается...глюк

export default AppHeader;

