import { BarLoader } from "react-spinners";

export default function LoadingPage() {
  return (
    <div className=" transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
      <span className="mr-4 block"> Searching for opponent </span>
      <BarLoader color="#fff" className="mx-auto mt-4" />
    </div>
  );
}
