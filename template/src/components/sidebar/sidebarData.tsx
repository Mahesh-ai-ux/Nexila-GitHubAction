import { all_routes } from "../../routes/all_routes";

const route = all_routes;
export const SidebarData = [
 {
    tittle: "Main Menu",
    icon: "airplay",
    showAsTab: true,
    separateRoute: false,
    submenuItems: [

      {
        label: "Applications",
        link:route.chat,
        submenu: true,
        showSubRoute: false,
        icon: "brand-airtable",
        base: "Applications",
        materialicons: "start",
        dot: true,
        submenuItems: [
          { label: "Enquire Form", link: route.kanbanview },

        ],
      },
     
    ],
  },
 {
    tittle: "CRM",
    icon: "airplay",
    showAsTab: true,
    separateRoute: false,
    submenuItems: [
      {
        label: "Demos",
        link: route.dealsGrid,
          relatedRoutes: [
          route.dealsGrid,
          route.dealsList,
          route.dealsDetails,
        ], 
        submenu: false,
        showSubRoute: false,
        icon: "medal",
        base: "frontent",
        materialicons: "start",
        dot: true,
        submenuItems: [],
      },
      {
        label: "Leads",
        link: route.leads,
         relatedRoutes: [
          route.leads,
          route.leadsList,
          route.leadsDetails,
        ], 
        submenu: false,
        showSubRoute: false,
        icon: "chart-arcs",
        base: "frontent",
        materialicons: "start",
        dot: true,
        submenuItems: [],
      },


// nexila changes // prending payment students
  {
  label: "Students",
  link: "#", // or keep a default route
  submenu: true,
  showSubRoute: false,
  icon: "atom-2",
  base: "frontent",
  materialicons: "start",
  dot: true,
  submenuItems: [
    {
      label: "Students Master",
      link: route.projectsGrid,
      submenu: false,
      showSubRoute: false,
      base: "all-students",
    },
    {
      label: "Pending Fee Students",
      link: route.pendingFeeStudents, // create this route
      submenu: false,
      showSubRoute: false,
      base: "pending-fee",
    },]
}
// nexila changes // prending payment students
     
    ],
  },
];