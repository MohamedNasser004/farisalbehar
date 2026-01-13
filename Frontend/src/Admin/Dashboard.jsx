'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // استخدم هذا بدل react-router-dom
import {jwtDecode} from "jwt-decode";
import Sidebar from "../Dashboard/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from "../Dashboard/BlogList";
import Update from "../Dashboard/Edit";
import AddBlog from "../Dashboard/AddBlog";
import AllComments from "./AllComments";
import EditComment from "./AcceptComment";
import DashboardHeader from "../Dashboard/DashboardHeader";
import ProtectedRoute from "./ProtectedRoute";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("articles");
  const [previousComponent, setPreviousComponent] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const router = useRouter();

  // التحقق من التوكن والصلاحيات
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role || role !== "admin") {
      sessionStorage.clear(); // حذف كل البيانات
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        sessionStorage.clear();
        router.push("/login");
      }
    } catch (error) {
      sessionStorage.clear();
      router.push("/login");
    }
  }, [router]);

  const handleBack = () => {
    if (activeComponent === "articles" || activeComponent === "comments") {
      setActiveComponent("articles");
      setPreviousComponent(null);
    } else if (previousComponent) {
      setActiveComponent(previousComponent);
      setPreviousComponent(null);
    }
  };

  const changeComponent = (newComponent) => {
    setPreviousComponent(activeComponent);
    setActiveComponent(newComponent);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "articles":
        return (
          <BlogList
            setActiveComponent={changeComponent}
            setSelectedSlug={setSelectedSlug}
          />
        );
      case "comments":
        return (
          <AllComments
            setActiveComponent={changeComponent}
            setSelectedSlug={setSelectedSlug}
          />
        );
      case "add-article":
        return <AddBlog />;
      case "update":
        return <Update slug={selectedSlug} />;
      case "comments/update":
        return <EditComment id={selectedSlug} />;
      default:
        return <BlogList />;
    }
  };

  return (
    <ProtectedRoute allowedRole="admin">
    <div className="d-flex">
      <Sidebar setActiveComponent={changeComponent} />
      <div className="p-4" style={{ width: "100%" }}>
        <DashboardHeader
          activeComponent={activeComponent}
          previousComponent={previousComponent}
          handleBack={handleBack}
        />
        {renderContent()}
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Dashboard;