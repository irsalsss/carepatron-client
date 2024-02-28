import { redirect } from "next/navigation";

const Home = () => {
  redirect("/clients");

  return (
    <main>
      <div>Home Page</div>
    </main>
  );
};

export default Home;
