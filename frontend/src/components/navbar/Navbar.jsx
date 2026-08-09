function Navbar() {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold">
          Patient Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Chetana 👋
        </p>
      </div>

      <div className="w-12 h-12 rounded-full bg-blue-500"></div>
    </header>
  );
}

export default Navbar;