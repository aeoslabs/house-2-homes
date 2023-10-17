import IndexComponent from "@/components/setup/page";
import Navbar from "@/components/ui/navbar";

export default async function Index() {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <IndexComponent />
    </div>
  );
}
