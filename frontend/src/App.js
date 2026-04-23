import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import InteractiveCursor from "./components/InteractiveCursor";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjectForm from "./pages/AdminProjectForm";
import AdminMessages from "./pages/AdminMessages";
import { Toaster } from "./components/ui/toaster";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <InteractiveCursor />
        
        <Routes>
          {/* Admin Routes (No Sidebar/MobileNav) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
          <Route path="/admin/projects/new" element={<AdminRoute><AdminProjectForm /></AdminRoute>} />
          <Route path="/admin/projects/edit/:id" element={<AdminRoute><AdminProjectForm /></AdminRoute>} />
          
          {/* Public Routes (With Sidebar/MobileNav) */}
          <Route path="/*" element={
            <>
              <Sidebar />
              <MobileNav />
              <main className="lg:ml-40 pt-[57px] lg:pt-0 pb-[65px] lg:pb-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
        
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
