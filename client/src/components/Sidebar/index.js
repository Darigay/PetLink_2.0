import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import charityLogo from "../../assets/images/best_friends_utah.png";
import { QUERY_ME_BASIC } from "../../utils/queries";

import FriendList from "../FriendList";




const Sidebar = () => {

    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const loggedIn = Auth.loggedIn();
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>
<CDBSidebarContent>
   
          {loggedIn && userData ? (
            <div>
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
  
          <div>
            <h5> Charity of the Month: </h5>
            <a
              href="https://utah.bestfriends.org/get-involved/donate"
              target="_blank"
              rel="noreferrer"
            >
              <img width="250px" src={charityLogo} alt="Best Friends in Utah" />
            </a>
          </div>
  
          
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;



// import React from "react";
// import { Layout } from "antd";
// // import "./SideBar.css"
// const Sidebar = ({ menu }) => {
//   return (
//     <Layout.Sider
//       className="sidebar"
//       breakpoint={"lg"}
//       theme="light"
//       collapsedWidth={0}
//       trigger={null}
//     >
//       {menu}
//    </Layout.Sider>
//    );
// };
// export default Sidebar;

// import { AutoComplete, Layout, Menu } from "antd";
// import React from "react";
// import { useState } from "react";
// // import { Link } from "react-router-dom";


// const { Sider, Content } = Layout;

// const Sidebar = () => {


//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <Layout hasSider>
//       <Sider style={{
//         overflow: 'auto',
//         height: '100vh',
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         bottom: 0,
//         width: 'auto',
//       }}>
//         <div />
//         <Menu>
          
//         </Menu>
//       </Sider>
//     </Layout>
//   );
// };

// export default Sidebar;
