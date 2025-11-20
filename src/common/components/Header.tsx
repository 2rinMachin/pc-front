import Link from "next/link";
import Logo from "./icons/Logo";
import Person from "./icons/Person";
import Phone from "./icons/Phone";

const Header = () => {
  return (
    <header className="bg-accent text-white px-4 py-2 flex">
      <div className="flex justify-between w-full max-w-3xl mx-auto items-center">
        <Link href="/" className="">
          <Logo />
        </Link>
        <div className="flex items-center gap-x-4">
          <button className="hover:bg-black/10 cursor-pointer transition-colors p-2 rounded-md flex items-center gap-x-1 focus:outline-2 focus:outline-white">
            <Phone className="size-6" />
            <span className="not-md:hidden">(01)505-1111</span>
          </button>

          <button className="hover:bg-black/10 cursor-pointer transition-colors p-2 rounded-md focus:outline-2 focus:outline-white">
            <Person className="size-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
