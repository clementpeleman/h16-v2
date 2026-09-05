function AppFooterCopyright() {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="text-meta text-ternary-dark">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://h16.be"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-300"
        >
          H16
        </a>{" "}
        | DESIGN:{" "}
        <a
          href="mailto:clementpeleman@outlook.com"
          className="text-secondary-dark uppercase tracking-[0.08em] underline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm ml-1 duration-300"
        >
          Clement Peleman
        </a>
      </div>
    </div>
  );
}

export default AppFooterCopyright;
