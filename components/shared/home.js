import React from "react";
import { Card, CardContent } from "@/components/ui/card";
const HomeComponent = ({ fullname, passengerNum, tripsCount, busNum }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, Driver {fullname}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Today's Schedule</h3>
            <p>You have {tripsCount} trips scheduled for today</p>
            <h3 className="text-lg font-semibold mb-2 mt-2">Assigned Bus Number</h3>
            <p>Bus Number : {busNum}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <p>Total passengers today: {passengerNum}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeComponent;
