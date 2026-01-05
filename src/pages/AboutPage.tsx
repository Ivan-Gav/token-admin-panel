import { Button } from "@/components/ui/Button";
import { LABELS } from "@/constants";
import { Link } from "@tanstack/react-router";

const DEMO_API_KEY = import.meta.env.VITE_DEMO_API_KEY;

export const AboutPage = () => {
  return (
    <div className="grow flex flex-col gap-4 text-lg">
      <p>
        This is a demo version of a token admin pannel. Real API calls replaced
        with msw-http-mock.
      </p>
      <p>
        The app gives you access to a list of tokens. You can create and edit
        them. Take notice that there's no real backend, so all the changes do
        not persist over a session.
      </p>
      <p>
        There is no on-site registration, you just get an access key from an
        admin and log in with it. To check the demo use this API key:{" "}
        <strong>{DEMO_API_KEY}</strong>.
      </p>

      <h3 className="font-bold text-xl">Tech stack</h3>
      <ul className="list-['-\a0\a0'] list-inside">
        <li>React</li>
        <li>Tanstack Query</li>
        <li>Tanstack Router</li>
        <li>Tanstack Form</li>
        <li>Zod</li>
        <li>Axios</li>
        <li>Tailwind</li>
        <li>Shadcn</li>
      </ul>
      <div className="flex justify-center items-center grow">
        <Link to="/">
          <Button variant={"outline"}>{LABELS.home}</Button>
        </Link>
      </div>
    </div>
  );
};
