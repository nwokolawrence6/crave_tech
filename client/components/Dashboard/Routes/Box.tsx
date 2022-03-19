import React from 'react';
import Link from "next/link";
import {Icon, Menu} from "semantic-ui-react";
import {IRoutes} from "./DashBoardRouterList";

const Box = ({route,title, icon, as}:IRoutes) => {
  return (
    <Link href={route}>
      <Menu.Item as={as}>
        <Icon name={icon} />
        {title}
      </Menu.Item>
    </Link>
  );
};

export default Box;
