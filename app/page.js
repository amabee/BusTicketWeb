"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Bus, Search, ArrowRight } from "lucide-react";

const WelcomeScreen = () => {
  useEffect(() => {
    window.location.href = "/Driver/";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BusGo
              </span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Register</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Smarter, Journey Better
          </h1>
          <p className="text-xl text-gray-600">
            Book your bus tickets with ease and comfort
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="Departure City" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="Arrival City" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" type="time" />
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <Search className="mr-2 h-4 w-4" /> Search Buses
            </Button>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">
                Book your tickets anytime, anywhere
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and fast booking process</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wide Network</h3>
              <p className="text-gray-600">Multiple routes and destinations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
