/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OverallTimetable from './pages/OverallTimetable';
import HelperTimetable from './pages/HelperTimetable';
import MaterialList from './pages/MaterialList';
import GuestList from './pages/GuestList';
import HotelInfo from './pages/HotelInfo';
import ContactList from './pages/ContactList';
import UsefulInfo from './pages/UsefulInfo';
import PhotoList from './pages/PhotoList';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OverallTimetable />} />
            <Route path="helper-timetable" element={<HelperTimetable />} />
            <Route path="materials" element={<MaterialList />} />
            <Route path="guests" element={<GuestList />} />
            <Route path="hotel-info" element={<HotelInfo />} />
            <Route path="contacts" element={<ContactList />} />
            <Route path="useful-info" element={<UsefulInfo />} />
            <Route path="photo-list" element={<PhotoList />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
