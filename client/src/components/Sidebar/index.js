import React from "react";
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from "cdbreact";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import charityLogo from "../../assets/images/best_friends_utah.png";
import { QUERY_ME_BASIC } from "../../utils/queries";

import FriendList from "../FriendList";

const Sidebar = () => {
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const loggedIn = Auth.loggedIn();
  return (

    <div class="sidenav">
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

    </div>
  );
};

// const Sidebar = () => {
//   const { data: userData } = useQuery(QUERY_ME_BASIC);
//   const loggedIn = Auth.loggedIn();
//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "auto" }}>
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a
//             href="/"
//             className="text-decoration-none"
//             style={{ color: "inherit" }}
//           >
//             Sidebar
//           </a>
//         </CDBSidebarHeader>
//         <CDBSidebarContent>
//           {loggedIn && userData ? (
//             <div>
//               <FriendList
//                 username={userData.me.username}
//                 friendCount={userData.me.friendCount}
//                 friends={userData.me.friends}
//               />
//             </div>
//           ) : null}

        //   <div>
        //     <h5> Charity of the Month: </h5>
        //     <a
        //       href="https://utah.bestfriends.org/get-involved/donate"
        //       target="_blank"
        //       rel="noreferrer"
        //     >
        //       <img width="250px" src={charityLogo} alt="Best Friends in Utah" />
        //     </a>
        //   </div>
//         </CDBSidebarContent>

//         <CDBSidebarFooter style={{ textAlign: "center" }}>
//           <div
//             style={{
//               padding: "20px 5px",
//             }}
//           >
//             Sidebar Footer
//           </div>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//     </div>
//   );
// };

export default Sidebar;

// import React from 'react';
// import { slide as Menu } from 'react-burger-menu';

// export default props => {
//   return (
//     <Menu>
//       <a className="menu-item" href="/">
//         Home
//       </a>

//       <a className="menu-item" href="/laravel">
//         Laravel
//       </a>

//       <a className="menu-item" href="/angular">
//         Angular
//       </a>

//       <a className="menu-item" href="/react">
//         React
//       </a>

//       <a className="menu-item" href="/vue">
//         Vue
//       </a>

//       <a className="menu-item" href="/node">
//         Node
//       </a>
//     </Menu>
//   );
// };

// import React from 'react';

// import {Navigation} from 'react-minimal-side-navigation';
// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

// function Sidebar() {
//     return (
//       <>
//         <Navigation
//             // you can use your own router's api to get pathname
//             activeItemId="/management/members"
//             onSelect={({itemId}) => {
//               // maybe push to the route
//             }}
//             items={[
//               {
//                 title: 'Dashboard',
//                 itemId: '/dashboard',
//                 // you can use your own custom Icon component as well
//                 // icon is optional
//                 elemBefore: () => <Icon name="inbox" />,
//               },
//               {
//                 title: 'Management',
//                 itemId: '/management',
//                 elemBefore: () => <Icon name="users" />,
//                 subNav: [
//                   {
//                     title: 'Projects',
//                     itemId: '/management/projects',
//                   },
//                   {
//                     title: 'Members',
//                     itemId: '/management/members',
//                   },
//                 ],
//               },
//               {
//                 title: 'Another Item',
//                 itemId: '/another',
//                 subNav: [
//                   {
//                     title: 'Teams',
//                     itemId: '/management/teams',
//                   },
//                 ],
//               },
//             ]}
//           />
//       </>
//     );
// };

// export default Sidebar;
