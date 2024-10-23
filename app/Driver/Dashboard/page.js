"use client";
import React from "react";
import { Home, Users, Bus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import HomeComponent from "@/components/shared/home";
import Passengers from "@/components/shared/passengers";
import MyTrips from "@/components/shared/mytrips";
import axios from "axios";

const Dashboard = () => {
  const url = "http://localhost/apibus/driver/api.php";
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeView, setActiveView] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const checkAuth = () => {
      const driverData = sessionStorage.getItem("driver");
      if (driverData == null) {
        window.location.href = "/Driver";
      } else {
        const user = JSON.parse(driverData);
        setCurrentUser(user);
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Only call getDashboardData when we have both conditions met
    if (!checkingAuth && currentUser && currentUser.driver_id) {
      getDashboardData();
    }
  }, [checkingAuth, currentUser]);

  const getDashboardData = async () => {
    if (!currentUser?.driver_id) {
      console.warn("Driver ID is not defined.");
      return;
    }

    try {
      const res = await axios.get(url, {
        params: {
          operation: "getdashBoardData",
          json: JSON.stringify({ driver_id: currentUser.driver_id }),
        },
      });

      if (res.status !== 200) {
        alert(res.statusText);
        return;
      }

      if (res.data.success) {
        setDashboardData(res.data.success);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Rest of your component remains the same...
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "passengers", label: "Passenger List", icon: Users },
    { id: "trips", label: "My Trips", icon: Bus },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <HomeComponent
            fullname={`${currentUser?.firstname || ""} ${
              currentUser?.lastname || ""
            }`}
            passengerNum={dashboardData.total_passengers}
            tripsCount={dashboardData.total_trips}
            busNum={currentUser.assigned_bus}
          />
        );
      case "passengers":
        return <Passengers driver_id={currentUser.driver_id} />;
      case "trips":
        return <MyTrips driver_id={currentUser.driver_id} />;
      default:
        return null;
    }
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = "/Driver";
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Bus className="h-12 w-12 text-blue-600" />
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg font-medium text-gray-700">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Bus Reservation</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
            <Button
              className="w-full justify-start"
              variant="ghost"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </nav>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
