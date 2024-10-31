import { ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/auth";

const Header = async () => {
  return (
    <header className=" w-full border-b">
      <div className=" wrapper flex-between">
        <div className=" flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/assets/icons/logo.svg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            {APP_NAME}
          </Link>
        </div>
        <div className="space-x-2 flex">
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit">
              <UserIcon />
              <span className="hidden md:block">Sign In</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
