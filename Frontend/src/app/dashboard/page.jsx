'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import "bootstrap/dist/css/bootstrap.min.css";

// Loading component
const Loading = () => <div className="d-flex justify-content-center my-5">Loading...</div>;

// Dynamically import components with SSR disabled
const Sidebar = dynamic(() => import("@/Dashboard/SideBar"), { 
  ssr: false,
  loading: () => <Loading />
});

const BlogList = dynamic(() => import("@/Dashboard/BlogList"), { 
  ssr: false,
  loading: () => <Loading />
});

const Update = dynamic(() => import("@/Dashboard/Edit"), { 
  ssr: false,
  loading: () => <Loading />
});

const AddBlog = dynamic(() => import("@/Dashboard/AddBlog"), { 
  ssr: false,
  loading: () => <Loading />
});

const AllComments = dynamic(() => import("@/Admin/AllComments"), { 
  ssr: false,
  loading: () => <Loading />
});

const EditComment = dynamic(() => import("@/Admin/AcceptComment"), { 
  ssr: false,
  loading: () => <Loading />
});

const DashboardHeader = dynamic(() => import("@/Dashboard/DashboardHeader"), { 
  ssr: false,
  loading: () => <Loading />
});

const ProtectedRoute = dynamic(() => import("@/Admin/ProtectedRoute"), { 
  ssr: false,
  loading: () => <Loading />
});

const ReplyComment = dynamic(() => import("@/Admin/ReplayComment"), { 
  ssr: false,
  loading: () => <Loading />
});

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("articles");
  const [previousComponent, setPreviousComponent] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      try {
        const { jwtDecode } = await import("jwt-decode");
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");

        if (!token || !role || role !== "admin") {
          sessionStorage.clear();
          router.push("/login");
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          sessionStorage.clear();
          router.push("/login");
        }
      } catch (error) {
        sessionStorage.clear();
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, isClient]);

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
    if (!isClient) return <Loading />;

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
        return (
          <Update
            slug={selectedSlug}
            setActiveComponent={changeComponent}
          />
        );
      case "comments/update":
        return (
          <EditComment
            id={selectedSlug}
            setActiveComponent={changeComponent}
            setSelectedSlug={setSelectedSlug}
          />
        );
      case "comments/reply":
        return (
          <ReplyComment
            commentId={selectedSlug}
            setActiveComponent={changeComponent}
          />
        );
      default:
        return <BlogList />;
    }
  };

  if (!isClient) {
    return <Loading />;
  }

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