// export const NormalRoutes = [
//     {path: '/', element: <Pages.About/>},
//     {path: '/results', element: <Pages.Farm/>},
//     {path: '/farm', element: <Pages.Farm/>},
//     {path: '/news', element: <Pages.New/>},
//     {path: '/about-us', element: <Pages.About/>}
// ];

import Home from "../Pages/Home/Home";
import Result from "../Pages/Result/Result";
import Farm from "../Pages/Farm/Farm";
import New from "../Pages/New/New";
import About from "../Pages/AboutUs/About";
import ProflieFarm from "../Pages/Farm/ProflieFarm";
import History from "../Pages/Result/History";
import NotFound from "../Pages/404/NotFound";
import PlantFarm from "../Pages/Farm/PlantFarm";
import ProjectFarm from "../Pages/Farm/ProjectFarm";
import PlantDetailFarm from "../Pages/Farm/PlantDetailFarm";

import TransactionHashQuery from "../Pages/Search/TransactionHashQuery";
import IndexQuery from "../Pages/Search/IndexQuery";
import TransactionHash from "../Pages/TransactionHashQuery";
import ProjectQuery from "../Pages/ProjectQuery";
import ScanPrivateQR from "../Pages/Scan";
import EventFarm from "../Pages/EventFarm";
export const NormalRoutes = [
  { path: "/", element: <Home /> },
  { path: "/results/:projectId", element: <Result /> },
  { path: "/results/timeline", element: <History /> },
  { path: "/farm", element: <Farm /> },
  { path: "/farm/detail/:farmId", element: <ProflieFarm /> },
  { path: "/farm/detail/:farmId/plants", element: <PlantFarm /> },
  { path: "/farm/detail/:farmId/projects", element: <ProjectFarm /> },
  {
    path: "/farm/detail/:farmId/plants/:plantId",
    element: <PlantDetailFarm />,
  },
  { path: "/search/transaction-hash-query", element: <TransactionHashQuery /> },
  { path: "/search/transaction-hash/:transactionHash", element: <TransactionHash /> },
  { path: "/search/index-query", element: <IndexQuery /> },
  { path: "/search/index/:projectIndex", element: <ProjectQuery /> },
  { path: "/event/farm/:farmId", element: <EventFarm />},
  { path: "/scan/:projectId/:privateId", element: <ScanPrivateQR /> },
  { path: "/news", element: <New /> },
  { path: "/about-us", element: <About /> },
  { path: "*", element: <NotFound /> },
];
