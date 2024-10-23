import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";

const Passengers = ({ driver_id }) => {
  const url = "http://localhost/apibus/driver/api.php";
  const [currentPassengers, setCurrentPassengers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [boardingInProgress, setBoardingInProgress] = useState({});

  useEffect(() => {
    if (driver_id == null) {
      console.log("No Driver ID");
      return;
    }

    getPassengers();
  }, [driver_id]);

  const getPassengers = async () => {
    try {
      const res = await axios.get(url, {
        params: {
          operation: "getBookings",
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
        setCurrentPassengers(res.data.success);
        return;
      } else {
        console.log(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedPassengers = () => {
    if (!sortConfig.key) return currentPassengers;

    return [...currentPassengers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const handlePassengerBoarding = async (reserve_id) => {
    setBoardingInProgress((prev) => ({ ...prev, [reserve_id]: true }));

    const formData = new FormData();
    formData.append("operation", "checkInPassenger");
    formData.append(
      "json",
      JSON.stringify({
        reservation_id: reserve_id,
      })
    );

    try {
      const res = await axios({
        url: url,
        method: "POST",
        data: formData,
      });

      if (res.status !== 200) {
        alert(res.statusText);
        setBoardingInProgress((prev) => ({ ...prev, [reserve_id]: false }));
        return;
      }

      if (res.data.success) {
        alert("Success");
        // Update the passenger status locally
        setCurrentPassengers((prevPassengers) =>
          prevPassengers.map((passenger) =>
            passenger.id === reserve_id
              ? { ...passenger, reservation_status: "boarded" }
              : passenger
          )
        );
      } else {
        alert("?");
        setBoardingInProgress((prev) => ({ ...prev, [reserve_id]: false }));
      }
    } catch (error) {
      alert(error);
      setBoardingInProgress((prev) => ({ ...prev, [reserve_id]: false }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Passenger List</h2>
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center gap-2">Transac ID</div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("seat")}
                  >
                    <div className="flex items-center gap-2">
                      Seat Number
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center gap-2">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getSortedPassengers().map((passenger, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {passenger.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {`${passenger.firstname} ${passenger.lastname}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {passenger.seat_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          passenger.reservation_status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {passenger.reservation_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        onClick={() => handlePassengerBoarding(passenger.id)}
                        className={`${
                          passenger.reservation_status === "active"
                            ? "bg-green-600 text-white hover:bg-green-800"
                            : "bg-gray-600"
                        }`}
                        disabled={
                          passenger.reservation_status !== "active" ||
                          boardingInProgress[passenger.id]
                        }
                      >
                        {boardingInProgress[passenger.id]
                          ? "Processing..."
                          : passenger.reservation_status !== "active"
                          ? "Boarded"
                          : "Board In"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Passengers;
