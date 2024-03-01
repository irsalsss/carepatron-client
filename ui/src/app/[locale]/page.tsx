import { redirect } from "next/navigation";

const Home = ({ params: { locale } }: { params: { locale: string }}) => {
  redirect(`/${locale}/clients`);

  return (
    <main>
      <div>Home Page</div>
    </main>
  );
};

export default Home;
