import TabLayout from "../layouts/TabLayout";

export default function Home() {
  return (
    <TabLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p className="text-red-800">Welcome to the Home Page!</p>
      </div>
    </TabLayout>
    
  );
}
