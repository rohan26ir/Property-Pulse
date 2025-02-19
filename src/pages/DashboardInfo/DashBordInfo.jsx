import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashBordInfo = () => {
  const axiosSecure = useAxiosSecure();

  const [dashboardData, setDashboardData] = useState({
    users: 0,
    apartments: 0,
    agreements: { total: 0, pending: 0, accepted: 0 },
    announcements: 0,
    coupons: { total: 0, available: 0 },
  });

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const [usersRes, apartmentsRes, agreementsRes, announcementsRes, couponsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/apartment"),
          axiosSecure.get("/agreements"),
          axiosSecure.get("/announcements"),
          axiosSecure.get("/coupons"),
        ]);
    
        setDashboardData({
          users: usersRes.data.length,
          apartments: apartmentsRes.data.total,
          agreements: {
            total: agreementsRes.data.length,
            pending: agreementsRes.data.filter((a) => a.status === "pending").length,
            accepted: agreementsRes.data.filter((a) => a.status === "accepted").length,
          },
          announcements: announcementsRes.data.length,
          coupons: {
            total: couponsRes.data.length,
            available: couponsRes.data.filter((c) => c.available).length,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardInfo();
  }, [axiosSecure]);

  // Data for General Overview Chart
  const generalChartData = {
    labels: ['Users', 'Apartments', 'Agreements', 'Announcements'],
    datasets: [
      {
        label: 'Total Count',
        data: [
          dashboardData.users,
          dashboardData.apartments,
          dashboardData.agreements.total,
          dashboardData.announcements
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }
    ]
  };

  // Data for Agreements & Coupons Chart
  const agreementsChartData = {
    labels: ['Total Agreements', 'Pending Agreements', 'Accepted Agreements', 'Coupons Available'],
    datasets: [
      {
        label: 'Count',
        data: [
          dashboardData.agreements.total,
          dashboardData.agreements.pending,
          dashboardData.agreements.accepted,
          dashboardData.coupons.available
        ],
        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  };

  // Data for Coupons Pie Chart
  const couponsChartData = {
    labels: ['Available Coupons', 'Used Coupons'],
    datasets: [
      {
        data: [
          dashboardData.coupons.available, 
          dashboardData.coupons.total - dashboardData.coupons.available
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  };

   // Data for Pending and Accepted Agreements Pie Chart
   const agreementsStatusChartData = {
    labels: ['Pending Agreements', 'Accepted Agreements'],
    datasets: [
      {
        data: [
          dashboardData.agreements.pending, 
          dashboardData.agreements.accepted
        ],
        backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{dashboardData.users}</p>
        </div> */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Apartments</h3>
          <p className="text-2xl">{dashboardData.apartments}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Agreements</h3>
          <p className="text-2xl">{dashboardData.agreements.total}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Pending Agreements</h3>
          <p className="text-2xl">{dashboardData.agreements.pending}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Accepted Agreements</h3>
          <p className="text-2xl">{dashboardData.agreements.accepted}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Announcements</h3>
          <p className="text-2xl">{dashboardData.announcements}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Coupons Available</h3>
          <p className="text-2xl">{dashboardData.coupons.available}/{dashboardData.coupons.total}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div>
          <div className="pt-7"> 
            <div className="bg-white p-4 shadow-md rounded-lg flex flex-col h-96">
              <h3 className="text-lg font-semibold mb-4">Coupons Distribution</h3>
              <div className="h-full">
                <Pie data={couponsChartData} />
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Pending & Accepted Agreements Pie Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg h-96 mt-6">
            <h3 className="text-lg font-semibold mb-4">Agreements Status</h3>
            <Pie data={agreementsStatusChartData} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">General Overview</h3>
          <Bar data={generalChartData} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Agreements & Coupons</h3>
          <Bar data={agreementsChartData} />
        </div>
      </div>
    </div>
  );
};

export default DashBordInfo;
