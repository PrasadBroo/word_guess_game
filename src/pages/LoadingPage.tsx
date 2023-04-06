
export default function LoadingPage() {
  return (
    <div className=" transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
      Wating for user <span className="mx-2 animate-bounce ">.</span>{" "}
      <span className="mr-2 animate-bounce  ">.</span>{" "}
      <span className=" animate-bounce  ">.</span>
    </div>
  );
}
