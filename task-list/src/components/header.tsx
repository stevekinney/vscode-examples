import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between" role="banner">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
};
