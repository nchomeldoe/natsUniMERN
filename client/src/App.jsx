import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  region: "eu-west-2",
  userPoolId: "eu-west-2_tTOU6Scc7",
  userPoolWebClientId: "52s6fjmrntvjnf16013bkei8pa",
});

export default function App() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

// import React from "react";
// import { Router } from "@reach/router";

// import NavBar from "./components/NavBar/NavBar";
// import HomePage from "./components/HomePage/HomePage";
// import StudentsListView from "./components/StudentsListView/StudentsListView";
// import StudentView from "./components/StudentView/StudentView";
// import NewStudent from "./components/NewStudent/NewStudent";
// import NotificationProvider from "./context/NotificationProvider";
// import SubjectsListView from "./components/SubjectsListView/SubjectsListView";
// import ServiceProvider from "./context/ServiceProvider";

// const App = () => {
//   return (
//     <>
//       <NotificationProvider>
//         <ServiceProvider>
//           <NavBar />
//           <Router>
//             <HomePage path="/" />
//             <StudentsListView path="/studentList" />
//             <SubjectsListView path="/subjectList" />
//             <StudentView path="/student/:studentId" />
//             <NewStudent path="/newStudent" />
//           </Router>
//         </ServiceProvider>
//       </NotificationProvider>
//     </>
//   );
// };

// export default App;
