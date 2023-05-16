import {
  StudentLanding,
  SharedLayout,
  Dashboard,
  Error,
  Announcement,
  ProtectedRoute,
  CoursePage,
  Attendence,
  Marks,
} from "./pages/StudentView/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="announcements" element={<Announcement />} />
          <Route path="course-details" element={<CoursePage />} />
          <Route path="attendence" element={<Attendence />} />
          <Route path="marks" element={<Marks />} />
        </Route>
        <Route path="/landing" element={<StudentLanding />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
