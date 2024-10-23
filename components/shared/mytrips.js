import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const MyTrips = ({ driver_id }) => {
  const url = "http://localhost/apibus/driver/api.php";
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    getMyTrips();
  }, []);

  const getMyTrips = async () => {
    try {
      const res = await axios.get(url, {
        params: {
          operation: "getCurrentDriverTrips",
          json: JSON.stringify({
            driver_id: driver_id,
          }),
        },
      });

      if (res.status !== 200) {
        alert(res.statusText);
        return;
      }

      if (res.data.success) {
        setMyTrips(res.data.success);
        return;
      } else {
        alert("wtf!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Trips</h2>
      <Card>
        <CardContent className="p-6">
          {myTrips.length === 0 ? (
            <p className="text-center text-gray-500">No trips found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Route</th>
                  <th className="text-left py-2 px-4 font-semibold">
                    Departure
                  </th>
                  <th className="text-left py-2 px-4 font-semibold">Price</th>
                  <th className="text-left py-2 px-4 font-semibold">Seats</th>
                </tr>
              </thead>
              <tbody>
                {myTrips.map((trip, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      {trip.from_loc} → {trip.to_loc}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(
                        `1970-01-01T${trip.departure_time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="py-2 px-4">
                      ₱ {parseFloat(trip.fare_price).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">
                      {/* {trip.available_seats}/ */}
                      {trip.seat_capacity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTrips;
