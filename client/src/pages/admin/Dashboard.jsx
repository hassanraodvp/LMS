// import React from 'react'

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
