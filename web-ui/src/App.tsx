import React from 'react';
import { Home, House, Matt } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SideMenu } from 'components/shared';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginLeft: drawerWidth
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <SideMenu drawerWidth={drawerWidth} />
      <main className={classes.content}>
        <Router>
          <Switch>
            <Route path="/house" component={House} />
            <Route path="/matt" component={Matt} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

// function App() {
//   const canvasRef = React.useRef<HTMLCanvasElement>(null);

//   React.useEffect(() => {
//     if (!canvasRef.current) {
//       return;
//     }

//     const data: ChartData = {
//       labels: ['DS1', 'DS2'],
//       datasets: [
//         {
          
//         }
//       ]
//     }

//     new Chart(canvasRef.current, {
//       type: 'line',
//       data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }, 
//         {
//           label: '# of Votes 2',
//           data: [1, 9, 13, 2, 5, 7],
//           backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//       }]
//       },
//       options: {
//           scales: {
//               yAxes: [{
//                   stacked: true
//               }]
//           }
//       }
//     });
//   });

//   return (
//     <div className="App">
//       <canvas ref={canvasRef} />
//     </div>
//   );
// }

export default App;
