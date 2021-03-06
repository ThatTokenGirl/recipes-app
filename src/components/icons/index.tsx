import {
  faBars,
  faScroll,
  faSearch,
  faShoppingBasket,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";

type IconProps = Omit<FontAwesomeIconProps, "icon">;

export const CloseIcon = createIconComponent(faTimes);
export const MenuIcon = createIconComponent(faBars);
export const RecipeIcon = createIconComponent(faScroll);
export const SearchIcon = createIconComponent(faSearch);
export const ShoppingIcon = createIconComponent(faShoppingBasket);

function createIconComponent(
  icon: IconDefinition
): FunctionComponent<IconProps> {
  return (props) => <FontAwesomeIcon icon={icon} {...props} />;
}
