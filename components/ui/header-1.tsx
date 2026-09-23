import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Header1({
 className,
 ...props
}: HTMLAttributes<HTMLHeadingElement>) {
 return (
  <h1
   className={cn(
    "scroll-m-20 text-4xl font-bold tracking-tight text-center lg:text-5xl",
    className,
   )}
   {...props}
  />
 );
}
