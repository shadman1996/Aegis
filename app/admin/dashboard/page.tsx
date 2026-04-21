import AdminAuthGate from "@/components/admin/AdminAuthGate";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Aegis Admin — Dashboard",
  description: "Internal admin panel for Aegis platform operations.",
};

export default function AdminDashboardPage() {
  return (
    <AdminAuthGate>
      <AdminDashboard />
    </AdminAuthGate>
  );
}
