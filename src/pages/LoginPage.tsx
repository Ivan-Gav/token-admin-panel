import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { useAuthContext } from "../context";
import { useNavigate } from "@tanstack/react-router";
import { Field, FieldError } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PasswordInput = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="Введите пароль"
        className={cn(
          "pr-10 md:text-xl h-auto min-w-[50vw] max-w-180",
          className
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-2 py-1 w-12 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Скрыть пароль" : "Показать пароль"}
        </span>
      </Button>
    </div>
  );
};

// ---------------------------------------------------------------

export const LoginPage = () => {
  const [value, setValue] = useState("");

  const { setApiKey, setIsAuthError, isAuthError } = useAuthContext();

  const navigate = useNavigate({ from: "/login" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      console.log("submitted: ", value);
      setApiKey(value.trim());
      setIsAuthError(false);
      navigate({ to: "/" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
      <Field>
        <PasswordInput
          id="admin-key"
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldError className="md:text-xl">
          {isAuthError ? "Неверный токен. Попробуйте снова" : ""}
        </FieldError>
      </Field>
      <Button
        type="submit"
        variant="outline"
        size={"lg"}
        className="md:text-xl w-fit"
      >
        {"Отправить"}
      </Button>
    </form>
  );
};
