import { FC } from "react";
import { useDrop } from "react-dnd";

import { useAppDispatch } from "../../../../services/hooks/hooks";

import BurgerConstructorDnd from "../../burgerConstructorDnd";

import { dropSelectedIngredient } from "../../../../services/actions/constructorActions";
import { IBurgerConstructorDnDWrapper } from "../../../../utils/types";
import { TDetailIngredient } from "../../../../utils/types";

const BurgerConstructorDndWrapper: FC<IBurgerConstructorDnDWrapper> = ({
  openModal,
}) => {
  const dispatch = useAppDispatch();
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredient }: TDetailIngredient) {
      dispatch(dropSelectedIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return <BurgerConstructorDnd openModal={openModal} ref={dropTarget} />;
};

export default BurgerConstructorDndWrapper;

/*
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";


import BurgerConstructorDnd from "../../burgerConstructorDnd";

import { dropSelectedIngredient } from "../../../../services/actions/constructorActions";


const BurgerConstructorDndWrapper = ({ openModal }) => {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      dispatch(dropSelectedIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <BurgerConstructorDnd
      openModal={openModal}
      isHover={isHover}
      ref={dropTarget}
    />
  );
};

export default BurgerConstructorDndWrapper;

*/
