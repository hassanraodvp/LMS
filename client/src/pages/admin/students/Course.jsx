import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ">
      <div className="relative ">
        <img
          src="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
          alt="Next.Js"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="py-2">Next.Js beginning course in Hindi, 2024.</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="cursor-pointer rounded-full"
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Mehak Alamgir</h1>
            <Badge
              className={
                "bg-blue-600 text-white rounded-full px-3 mx-2 py-1 text-xs"
              }
            >
              Advance
            </Badge>
          </div>
        </div>
        <div className="text-lg font-bold pt-2">
          <span>$100</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
