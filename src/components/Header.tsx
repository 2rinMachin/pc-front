import Link from 'next/link';
import AccountButton from './AccountButton';
import Logo from './icons/Logo';
import Phone from './icons/Phone';

const PHONE_NUMBER = '(01)505-1111';

const Header = () => {
  return (
    <header className="bg-accent flex px-4 py-2 text-white">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <Link href="/" className="">
          <Logo />
        </Link>
        <div className="flex items-center gap-x-1">
          <Link
            href={`tel:${PHONE_NUMBER}`}
            className="flex cursor-pointer items-center gap-x-1 rounded-md px-2 py-3 transition-colors hover:bg-black/10 focus:outline-2 focus:outline-white"
          >
            <Phone className="size-6" />
            <span className="textmd not-md:hidden">{PHONE_NUMBER}</span>
          </Link>
          <AccountButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
