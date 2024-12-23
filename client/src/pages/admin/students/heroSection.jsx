import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative px-4 py-16 text-center top-16 bg-gradient-to-r from-blue-400 to-blue-900 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-white">
          Find the Best Course for you.
        </h1>
        <p
          className="text-lg italic tracking-wider text-gray-300"
          style={{ paddingTop: "1rem" }}
        >
          &quot;Code is like humor. When you have to explain it, it’s bad.&quot;
        </p>
        <p className="px-20 mt-2 text-lg font-bold text-gray-300 text-end">
          ( Cory House - )
        </p>
        <form
          action="#"
          className="flex items-center max-w-xl mx-auto mt-3 mb-6 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-900"
        >
          <input
            type="text"
            placeholder="Search courses ..."
            className="flex-grow px-4 font-medium tracking-wider text-gray-900 border-none focus:outline-none dark:text-gray-100 dark:placeholder-gray-500"
          />
          <Button className="px-4 py-3 font-bold text-white bg-blue-500 rounded-r-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900">
            Search
          </Button>
        </form>
        <Button className="px-6 py-3 font-bold tracking-wide text-gray-900 bg-white rounded-full hover:bg-slate-200 dark:hover:bg-blue-900">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
