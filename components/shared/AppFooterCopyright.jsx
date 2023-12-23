function AppFooterCopyright() {
  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-lg text-ternary-dark dark:text-ternary-light">
        &copy; {new Date().getFullYear()}
        <a
          href="https://h16.be"
          target="__blank"
          className=" hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500"
        >
          H16{" "}
        </a>
        | DESIGN:{" "}
        <a
          href="mailto: clementpeleman@outlook.com"
          target="__blank"
          className="text-secondary-dark dark:text-secondary-light font-medium uppercase underline hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500"
        >
          Clement Peleman
        </a>
      </div>
    </div>
  );
}

export default AppFooterCopyright;
