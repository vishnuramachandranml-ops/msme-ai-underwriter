import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-8
      "
    >
      <SearchBar />

      <NavbarActions />
    </header>
  );
};

export default Navbar;